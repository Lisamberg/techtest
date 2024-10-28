import { ILogger } from "../domain/logger/logger.interface";
import { UserRepository } from "../domain/repositories/userRepository.interface";

export class DeleteUserUseCase {
    constructor(
        private readonly logger: ILogger,
        private readonly userRepository: UserRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const result = await this.userRepository.deleteById(id);
        this.logger.log(
            "deleteUserUseCases execute",
            `user ${id} have been deleted`,
        );
        return result;
    }
}
