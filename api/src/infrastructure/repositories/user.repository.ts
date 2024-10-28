import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/userRepository.interface";
import { UserM, UpdateUserM } from "../../domain/model/user";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Raw, Repository } from "typeorm";

@Injectable()
export class DatabaseUserRepository implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userEntityRepository: Repository<User>,
    ) {}

    async doUserAlreadyExists(
        { firstName, lastName }: Partial<Pick<UserM, "firstName" | "lastName">>,
        id?: string,
    ): Promise<boolean> {
        const where = {
            firstName: Raw((alias) => `${alias} ILIKE :firstName`, {
                firstName,
            }),
            lastName: Raw((alias) => `${alias} ILIKE :lastName`, {
                lastName,
            }),
            id: id // Pour le cas des update
                ? Raw((alias) => `${alias} != :id`, {
                      id, // On exclu l'utilisateurs de la verif
                  })
                : undefined,
        };

        return this.userEntityRepository.exists({
            where,
        });
    }

    async update(id: string, user: UpdateUserM): Promise<void> {
        await this.userEntityRepository.update({ id: id }, user);
    }

    async insert(user: UserM): Promise<UserM> {
        const userEntity = this.toUserEntity(user);
        const result = await this.userEntityRepository.insert(userEntity);
        const id = result.generatedMaps[0]["id"]; //Seul l'id est dispo en insert result
        const createdUser = await this.findById(id);
        return this.toUser(createdUser);
    }

    async findAll(): Promise<UserM[]> {
        const usersEntity = await this.userEntityRepository.find({
            order: {
                lastName: "ASC",
            },
        });
        return usersEntity.map((userEntity) => this.toUser(userEntity));
    }

    async findById(id: string): Promise<UserM> {
        const userEntity = await this.userEntityRepository.findOneOrFail({
            where: {
                id,
            },
        });
        return this.toUser(userEntity);
    }

    async deleteById(id: string): Promise<void> {
        await this.userEntityRepository.delete({ id });
    }

    private toUser(userEntity: User): UserM {
        const user: UserM = new UserM();

        user.id = userEntity.id;
        user.firstName = userEntity.firstName;
        user.lastName = userEntity.lastName;

        return user;
    }

    private toUserEntity(user: UserM): User {
        const userEntity: User = new User();

        userEntity.id = user.id;
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;

        return userEntity;
    }
}
