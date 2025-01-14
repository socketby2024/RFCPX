import { IsString, IsOptional, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCampaignDto {
  @ApiProperty({ description: "Product ID", required: false })
  @IsOptional()
  @IsString()
  product_id?: string;

  @ApiProperty({ description: "Campaign ID", required: false })
  @IsOptional()
  @IsString()
  campaign_id?: string;

  @ApiProperty({ description: "UUID", required: false })
  @IsOptional()
  @IsString()
  uuid?: string;

  @ApiProperty({ description: "User ID", required: false })
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiProperty({ description: "Short link", required: false })
  @IsOptional()
  @IsString()
  short_link?: string;

  @ApiProperty({ description: "Campaign description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Image URL", required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ description: "Video URL", required: false })
  @IsOptional()
  @IsString()
  video_url?: string;

  @ApiProperty({ description: "Use status (true: active, false: deleted)", required: false })
  @IsOptional()
  @IsBoolean()
  use?: boolean;
}
