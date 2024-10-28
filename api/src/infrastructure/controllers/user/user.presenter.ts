import { ApiProperty } from "@nestjs/swagger";
import { UserM } from "../../../domain/model/user";

export class UserPresenter {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;

    constructor(user: UserM) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
}
