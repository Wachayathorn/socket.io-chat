import { IsNotEmpty, IsString } from "class-validator";


export class RecieveChatRequestDto {
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    content : string;

    @IsString()
    @IsNotEmpty()
    time : string;
}