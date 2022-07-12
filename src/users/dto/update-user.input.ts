import { InputType, Field } from '@nestjs/graphql';
import {ApiPropertyOptional} from "@nestjs/swagger";

@InputType()
export class UpdateUserInput {
  @ApiPropertyOptional()
  @Field({ nullable: true })
  firstname?: string;

  @ApiPropertyOptional()
  @Field({ nullable: true })
  lastname?: string;
}
