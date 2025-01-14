import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CampaignResponse } from './interface/campaign_response.interface';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create_compaign.dto';
import { UpdateCampaignDto } from './dto/update_compaign.dto';
import { findAllCompaign } from './dto/find_all_compaign.dto';
import { TargetSearchListDto } from './dto/target_search_dto';

@ApiTags('Campaign')
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('create')
  @ApiOperation({ summary: "Create a new campaign" }) // 설명 추가
  @ApiResponse({ status: 201, description: "Campaign created successfully" }) // 응답 코드 설명
  @ApiResponse({ status: 500, description: "Failed to create campaign" }) // 오류 코드 설명
  async createCampaign(@Body() data: CreateCampaignDto): Promise<CampaignResponse> {
    return await this.campaignService.createCampaign(data);
  }

  @Post("search")
  @ApiOperation({ summary: "Search campaigns", description: "Search, filter, and paginate campaigns." }) // 설명 추가
  @ApiResponse({ status: 200, description: "Successfully retrieved campaigns." }) // 성공 응답
  @ApiResponse({ status: 500, description: "Failed to retrieve campaigns." }) // 실패 응답
  async getAllCampaigns(@Body() data: findAllCompaign): Promise<CampaignResponse> {
    return await this.campaignService.getAllCampaigns(data);
  }

  @Post("find")
  @ApiOperation({ summary: "Find campaign by ID", description: "Retrieve a campaign by its ID." }) // 설명 추가
  @ApiResponse({ status: 200, description: "Successfully retrieved campaign." }) // 성공 응답
  @ApiResponse({ status: 404, description: "Campaign not found." }) // 캠페인 없음
  @ApiResponse({ status: 500, description: "Failed to retrieve campaign." }) // 서버 오류
  @ApiBody({ schema: { type: "object", properties: { id: { type: "number", example: 1 } } } })
  async getCampaignById(@Body() body: { id: number }): Promise<CampaignResponse> {
    return await this.campaignService.getCampaignById(body.id);
  }

  @Post("update")
  @ApiOperation({ summary: "Update a campaign", description: "Update a campaign by its ID." }) // API 설명
  @ApiResponse({ status: 200, description: "Successfully updated campaign." }) // 성공 응답
  @ApiResponse({ status: 400, description: "ID is required for updating a campaign." }) // 잘못된 요청
  @ApiResponse({ status: 404, description: "Campaign not found." }) // 캠페인 없음
  @ApiResponse({ status: 500, description: "Failed to update campaign." }) // 서버 오류
  async updateCampaign(@Body() updateData: UpdateCampaignDto): Promise<CampaignResponse> {
    return await this.campaignService.updateCampaign(updateData);
  }

  @Post("delete")
  @ApiOperation({ summary: "Deactivate a campaign", description: "Soft delete a campaign by setting 'use' to false." }) // API 설명
  @ApiResponse({ status: 200, description: "Campaign deactivated successfully." }) // 성공 응답
  @ApiResponse({ status: 404, description: "Campaign not found or already deactivated." }) // 캠페인 없음
  @ApiResponse({ status: 500, description: "Failed to deactivate campaign." }) // 서버 오류
  @ApiBody({ schema: { type: "object", properties: { id: { type: "number", example: 1 } } } })
  async deleteCampaign(@Body() body: { id: number }): Promise<CampaignResponse> {
    return await this.campaignService.deleteCampaign(body.id);
  }

  @Post('target_search')
  @ApiOperation({
    summary: 'Search for a campaign',
    description: 'Search for a campaign by `uuid`, `product_id`, or `user_id`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Campaign retrieved successfully.',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        msg: 'Campaign retrieved successfully',
        data: {
          uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          product_id: '12345',
          user_id: '67890',
          campaign_id: '98765',
          short_link: 'https://example.com/xyz',
          created_at: '2024-01-10T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - action must be uuid, product_id, or user_id',
    schema: {
      example: {
        success: false,
        statusCode: 400,
        msg: "Bad Request: 'action' must be one of [uuid, product_id, user_id]",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
    schema: {
      example: {
        success: false,
        statusCode: 404,
        msg: 'Campaign not found',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        success: false,
        statusCode: 500,
        msg: 'Failed to retrieve campaign',
        data: undefined,
      },
    },
  })
  async targetSearchList(@Body() data: TargetSearchListDto): Promise<CampaignResponse> {
    return await this.campaignService.targetSearchList(data);
  }

}