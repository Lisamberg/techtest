import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repositories/userRepository.interface";

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<UserM[]> {
        return this.userRepository.findAll();
    }
}
