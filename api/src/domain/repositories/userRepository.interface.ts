import { UpdateUserM, UserM } from "../model/user";

export interface UserRepository {
    insert(user: UserM): Promise<UserM>;
    findAll(): Promise<UserM[]>;
    findById(id: string): Promise<UserM>;
    doUserAlreadyExists(
        user: Partial<Pick<UserM, "firstName" | "lastName">>,
        id?: string,
    ): Promise<boolean>;
    update(id: string, user: UpdateUserM): Promise<void>;
    deleteById(id: string): Promise<void>;
}
