import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { LoggerService } from "./core/logger/logger.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(app.get(LoggerService));
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Finance control app")
    .setDescription("API для управления финансами")
    .setVersion("0.1")
    .addBearerAuth(undefined, "defaultBearerAuth")
    .build();
  const configService = app.get(ConfigService);
  const port = configService.get<number>("port") || 3000;
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);
  await app.listen(port);
}
bootstrap();
