import { IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TargetSearchListDto {
  @ApiProperty({ description: "Search action key", example: "product_id or uuid or user_id " })
  @IsOptional()
  @IsString()
  action: string;
  
  @ApiProperty({ description: "action value ID", example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @IsString()
  id: number;
}
