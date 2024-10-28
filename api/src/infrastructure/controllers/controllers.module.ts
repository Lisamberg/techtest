import { Module } from "@nestjs/common";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { UserController } from "./user/user.controller";
import { HealthcheckController } from "./healthcheck.controller";

@Module({
    imports: [UsecasesProxyModule.register()],
    controllers: [UserController, HealthcheckController],
})
export class ControllersModule {}
