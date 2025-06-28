import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggerService } from "../logger/logger.service";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private configService: ConfigService,
    private logger: LoggerService
  ) {
    super({
      datasources: {
        db: {
          url: configService.get("database.url"),
        },
      },
    });
    this.logger.setContext("DatabaseService");
  }

  async onModuleInit() {
    try {
      this.logger.log("Подключение к базе данных...");
      await this.$connect();
      this.logger.log("Успешно подключено к базе данных");
    } catch (error) {
      this.logger.error(
        "Ошибка подключения к базе данных",
        error instanceof Error ? error.stack : String(error)
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      this.logger.log("Отключение от базы данных...");
      await this.$disconnect();
      this.logger.log("Успешно отключено от базы данных");
    } catch (error) {
      this.logger.error(
        "Ошибка при отключении от базы данных",
        error instanceof Error ? error.stack : String(error)
      );
    }
  }
}
