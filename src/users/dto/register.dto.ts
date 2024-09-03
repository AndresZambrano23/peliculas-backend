import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Register {
  @ApiProperty({ description: `name` })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: `lastname` })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ description: `email` })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: `email` })
  @IsNotEmpty()
  @IsString()
  password: string;
}
