import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Length(1, 150)
    @IsString()
    readonly firstName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Length(1, 150)
    @IsString()
    readonly lastName: string;
}

export class AddUserDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Length(1, 150)
    @IsString()
    readonly firstName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Length(1, 150)
    @IsString()
    readonly lastName: string;
}
