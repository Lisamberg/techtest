import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { EnvironmentConfigModule } from "../config/environment-config/environment-config.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { ExceptionsModule } from "../exceptions/exceptions.module";
import { LoggerService } from "../logger/logger.service";
import { DatabaseUserRepository } from "../repositories/user.repository";
import { UseCaseProxy } from "./usecases-proxy";
import { AddUserUseCase } from "../../usecases/addUser.usecase";
import { GetUserUseCase } from "../../usecases/getUser.usecase";
import { GetUsersUseCase } from "../../usecases/getUsers.usecase";
import { DeleteUserUseCase } from "../../usecases/deleteUser.usecase";
import { UpdateUserUseCase } from "../../usecases/updateUser.usecase";

@Module({
    imports: [
        LoggerModule,
        EnvironmentConfigModule,
        RepositoriesModule,
        ExceptionsModule,
    ],
})
export class UsecasesProxyModule {
    static GET_USER_USECASES_PROXY = "getUserUsecasesProxy";
    static GET_USERS_USECASES_PROXY = "getUsersUsecasesProxy";
    static POST_USER_USECASES_PROXY = "postUserUsecasesProxy";
    static DELETE_USER_USECASES_PROXY = "deleteUserUsecasesProxy";
    static PUT_USER_USECASES_PROXY = "putUserUsecasesProxy";

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [DatabaseUserRepository],
                    provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
                    useFactory: (userRepository: DatabaseUserRepository) =>
                        new UseCaseProxy(new GetUserUseCase(userRepository)),
                },
                {
                    inject: [DatabaseUserRepository],
                    provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
                    useFactory: (userRepository: DatabaseUserRepository) =>
                        new UseCaseProxy(new GetUsersUseCase(userRepository)),
                },
                {
                    inject: [LoggerService, DatabaseUserRepository],
                    provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        userRepository: DatabaseUserRepository,
                    ) =>
                        new UseCaseProxy(
                            new AddUserUseCase(logger, userRepository),
                        ),
                },
                {
                    inject: [LoggerService, DatabaseUserRepository],
                    provide: UsecasesProxyModule.PUT_USER_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        userRepository: DatabaseUserRepository,
                    ) =>
                        new UseCaseProxy(
                            new UpdateUserUseCase(logger, userRepository),
                        ),
                },
                {
                    inject: [LoggerService, DatabaseUserRepository],
                    provide: UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        userRepository: DatabaseUserRepository,
                    ) =>
                        new UseCaseProxy(
                            new DeleteUserUseCase(logger, userRepository),
                        ),
                },
            ],
            exports: [
                UsecasesProxyModule.GET_USER_USECASES_PROXY,
                UsecasesProxyModule.GET_USERS_USECASES_PROXY,
                UsecasesProxyModule.POST_USER_USECASES_PROXY,
                UsecasesProxyModule.PUT_USER_USECASES_PROXY,
                UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
            ],
        };
    }
}
