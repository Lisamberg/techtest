import { LoggerService } from "../../src/infrastructure/logger/logger.service";

export class MockLoggerService extends LoggerService {
    debug(context: string, message: string) {}
    log(context: string, message: string) {}
    error(context: string, message: string, trace?: string) {}
    warn(context: string, message: string) {}
    verbose(context: string, message: string) {}
}
