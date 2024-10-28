import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller()
export class HealthcheckController {
    constructor() {}

    @Get("/healthcheck")
    @ApiTags("healthcheck")
    healthcheck(): string {
        return "OK";
    }
}
