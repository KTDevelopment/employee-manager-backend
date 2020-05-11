import {ApiProperty} from "@nestjs/swagger";
import {CreateDateColumn} from "typeorm";
import {IsOptional} from "class-validator";

export class BaseEntity {
    @ApiProperty({readOnly: true})
    @IsOptional()
    @CreateDateColumn({readonly: true})
    creationDate: Date;
}
