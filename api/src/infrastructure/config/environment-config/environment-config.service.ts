import { Injectable } from "@nestjs/common";
import { DatabaseConfig } from "./database.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
    constructor(private configService: ConfigService) {}

    getDatabaseHost(): string {
        return this.configService.get<string>("DB_HOST");
    }

    getDatabasePort(): number {
        return this.configService.get<number>("DB_PORT");
    }

    getDatabaseUser(): string {
        return this.configService.get<string>("DB_USER");
    }

    getDatabasePassword(): string {
        return this.configService.get<string>("DB_PASS");
    }

    getDatabaseName(): string {
        return this.configService.get<string>("DB_NAME");
    }
}
