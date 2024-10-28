export class UserM {
    id: string;
    firstName: string;
    lastName: string;
}

export type UpdateUserM = Partial<Pick<UserM, "firstName" | "lastName">>;
export type NewUserM = Pick<UserM, "firstName" | "lastName">;
