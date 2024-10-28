import { ConflictException } from "@nestjs/common";
import { ILogger } from "../domain/logger/logger.interface";
import { NewUserM, UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repositories/userRepository.interface";

export class AddUserUseCase {
    constructor(
        private readonly logger: ILogger,
        private readonly userRepository: UserRepository,
    ) {}

    async execute(user: NewUserM): Promise<UserM> {
        const newUser = new UserM();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;

        const doUserAlreadyExists =
            await this.userRepository.doUserAlreadyExists(user);

        if (doUserAlreadyExists) {
            this.logger.warn(
                "updateUserUseCases execute",
                "User already exists",
            );

            throw new ConflictException(
                "Un utilisateur avec le même nom et prénom existe déjà.",
            );
        }

        const userCreated = await this.userRepository.insert(newUser);

        this.logger.log(
            "addUserUseCases execute",
            "New user have been inserted",
        );

        return userCreated;
    }
}
