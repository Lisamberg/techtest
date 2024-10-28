import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { ApiResponseType } from "../../common/swagger/response.decorator";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { UserPresenter } from "./user.presenter";
import { GetUserUseCase } from "../../../usecases/getUser.usecase";
import { GetUsersUseCase } from "../../../usecases/getUsers.usecase";
import { UpdateUserUseCase } from "../../../usecases/updateUser.usecase";
import { DeleteUserUseCase } from "../../../usecases/deleteUser.usecase";
import { AddUserUseCase } from "../../../usecases/addUser.usecase";
import { AddUserDto, UpdateUserDto } from "./user.dto";

@Controller("users")
@ApiTags("users")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(UserPresenter)
export class UserController {
    constructor(
        @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
        private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCase>,
        @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
        private readonly getAllUserUsecaseProxy: UseCaseProxy<GetUsersUseCase>,
        @Inject(UsecasesProxyModule.PUT_USER_USECASES_PROXY)
        private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCase>,
        @Inject(UsecasesProxyModule.DELETE_USER_USECASES_PROXY)
        private readonly deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCase>,
        @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
        private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCase>,
    ) {}

    @Get()
    @ApiResponseType(UserPresenter, true)
    async getUsers() {
        const users = await this.getAllUserUsecaseProxy.getInstance().execute();
        return users.map((user) => new UserPresenter(user));
    }

    @Get(":id")
    @ApiResponseType(UserPresenter, false)
    async getUser(@Param("id") id: string) {
        const user = await this.getUserUsecaseProxy.getInstance().execute(id);
        return new UserPresenter(user);
    }

    @Put(":id")
    @ApiResponse({ status: 409, description: "User already exists" })
    @ApiResponseType(UserPresenter, false)
    async updateUser(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const { firstName, lastName } = updateUserDto;
        await this.updateUserUsecaseProxy
            .getInstance()
            .execute(id, { firstName, lastName });
        return "success";
    }

    @Delete(":id")
    @ApiResponseType(UserPresenter, false)
    async deleteUser(@Param("id") id: string) {
        await this.deleteUserUsecaseProxy.getInstance().execute(id);
        return "success";
    }

    @Post()
    @ApiResponse({ status: 409, description: "User already exists" })
    @ApiResponseType(UserPresenter, false)
    async addUser(@Body() addUserDto: AddUserDto) {
        const userCreated = await this.addUserUsecaseProxy
            .getInstance()
            .execute(addUserDto);
        return new UserPresenter(userCreated);
    }
}
