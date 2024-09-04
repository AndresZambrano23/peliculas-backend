import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Login {
  @ApiProperty({ description: `email` })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: `email` })
  @IsNotEmpty()
  @IsString()
  password: string;
}
