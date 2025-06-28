import {
  Injectable,
  LoggerService as NestLoggerService,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  constructor(private configService: ConfigService) {}

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: any, context?: string) {
    console.log(
      `[${this.getTimestamp()}] [${this.getContext(context)}] [LOG] ${message}`
    );
  }

  error(message: any, trace?: string, context?: string) {
    console.error(
      `[${this.getTimestamp()}] [${this.getContext(context)}] [ERROR] ${message}`
    );
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: any, context?: string) {
    console.warn(
      `[${this.getTimestamp()}] [${this.getContext(context)}] [WARN] ${message}`
    );
  }

  debug(message: any, context?: string) {
    if (this.isDebugEnabled()) {
      console.debug(
        `[${this.getTimestamp()}] [${this.getContext(context)}] [DEBUG] ${message}`
      );
    }
  }

  verbose(message: any, context?: string) {
    if (this.isVerboseEnabled()) {
      console.log(
        `[${this.getTimestamp()}] [${this.getContext(context)}] [VERBOSE] ${message}`
      );
    }
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private getContext(context?: string): string {
    return context || this.context || "Application";
  }

  private isDebugEnabled(): boolean {
    const nodeEnv = this.configService.get<string>(
      "NODE_ENV",
      "development"
    );
    return nodeEnv !== "production";
  }

  private isVerboseEnabled(): boolean {
    const nodeEnv = this.configService.get<string>(
      "NODE_ENV",
      "development"
    );
    return nodeEnv !== "production";
  }
}
