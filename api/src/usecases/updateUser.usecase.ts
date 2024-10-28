import { ConflictException } from "@nestjs/common";
import { ILogger } from "../domain/logger/logger.interface";
import { UpdateUserM } from "../domain/model/user";
import { UserRepository } from "../domain/repositories/userRepository.interface";

export class UpdateUserUseCase {
    constructor(
        private readonly logger: ILogger,
        private readonly userRepository: UserRepository,
    ) {}

    async execute(id: string, user: UpdateUserM): Promise<void> {
        await this.userRepository.findById(id);

        const doUserAlreadyExists =
            await this.userRepository.doUserAlreadyExists(user, id);

        if (doUserAlreadyExists) {
            this.logger.warn(
                "updateUserUseCases execute",
                "User already exists",
            );

            throw new ConflictException(
                "Un utilisateur avec le même nom et prénom existe déjà.",
            );
        }

        await this.userRepository.update(id, user);

        this.logger.log(
            "updateUserUseCases execute",
            `user ${id} have been updated`,
        );

        return;
    }
}
