import {
  IsUUID,
  IsNotEmpty,
  ValidateNested,
  IsArray
} from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DecorationSnowballDto } from './decoration-snowball.dto';

export class UpdateSnowballDto {
  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  @IsUUID('4')
  snowball_uuid: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DecorationSnowballDto)
  @ApiProperty({
    type: [DecorationSnowballDto],
    description: '데코오브젝트들이 들어있는 배열'
  })
  readonly deco_list: DecorationSnowballDto[];
}
