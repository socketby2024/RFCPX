import { IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class findAllCompaign {
  @ApiProperty({ description: "Search keyword", required: false, example: "promo" })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({ description: "Search field (e.g., campaign_id, description)", required: false, example: "campaign_id" })
  @IsOptional()
  @IsString()
  searchField?: string;

  @ApiProperty({ description: "Sort field (e.g., created_at, like_count)", required: false, example: "created_at" })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiProperty({ description: "Sort order (ASC or DESC)", required: false, example: "DESC" })
  @IsOptional()
  @IsString()
  sortOrder?: string;

  @ApiProperty({ description: "Page number", required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ description: "Limit per page", required: false, example: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
