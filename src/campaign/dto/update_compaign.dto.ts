import { PartialType } from "@nestjs/mapped-types";
import { CreateCampaignDto } from "./create_compaign.dto";
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  @ApiProperty({ description: "Campaign ID", example: 1 }) //필수 필드
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ description: "Product ID", example: "string" })
  @IsOptional()
  @IsString()
  product_id?: string;

  @ApiPropertyOptional({ description: "Campaign ID", example: "string" })
  @IsOptional()
  @IsString()
  campaign_id?: string;

  @ApiPropertyOptional({ description: "UUID", example: "string" })
  @IsOptional()
  @IsString()
  uuid?: string;

  @ApiPropertyOptional({ description: "User ID", example: "string" })
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiPropertyOptional({ description: "Short link", example: "string" })
  @IsOptional()
  @IsString()
  short_link?: string;

  @ApiPropertyOptional({ description: "Campaign description", example: "string" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "Image URL", example: "string" })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiPropertyOptional({ description: "Video URL", example: "string" })
  @IsOptional()
  @IsString()
  video_url?: string;

  @ApiPropertyOptional({ description: "Use status (true: active, false: deleted)", example: true })
  @IsOptional()
  @IsBoolean()
  use?: boolean;
}
