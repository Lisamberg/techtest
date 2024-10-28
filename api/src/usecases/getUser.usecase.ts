import { UserM } from "../domain/model/user";
import { UserRepository } from "../domain/repositories/userRepository.interface";

export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<UserM> {
        return this.userRepository.findById(id);
    }
}
