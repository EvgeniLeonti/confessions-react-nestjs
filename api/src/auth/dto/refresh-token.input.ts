import { ArgsType, Field } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ArgsType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  @Field()
  @ApiProperty()
  token: string;
}
