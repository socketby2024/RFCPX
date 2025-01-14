import { Injectable, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsOrder } from 'typeorm';
import { Campaign } from './entity/campaign.entity'
import { CampaignResponse } from './interface/campaign_response.interface';
import { CampaignData } from './interface/campaign_data.interface';
import { CreateCampaignDto } from './dto/create_compaign.dto';
import { UpdateCampaignDto } from './dto/update_compaign.dto';
import { findAllCompaign } from './dto/find_all_compaign.dto';
import { TargetSearchListDto } from './dto/target_search_dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async createCampaign(data: CreateCampaignDto): Promise<CampaignResponse> {
    try {
      const campaign = this.campaignRepository.create(data);
      const savedCampaign = await this.campaignRepository.save(campaign);

      return {
        success: true,
        statusCode: HttpStatus.CREATED, // 201
        msg: "Campaign created successfully.",
        data: savedCampaign,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
        msg: "Failed to create campaign.",
        data: error.message,
      };
    }
  };

  async getAllCampaigns(findAllProductDto: findAllCompaign): Promise<CampaignResponse> {
    try {
      const { keyword, searchField, page = 1, limit = 15, sortField, sortOrder } = findAllProductDto;
      // 검색 조건 생성
      const whereCondition = {
        ...(keyword && searchField ? { [searchField]: Like(`%${keyword}%`) } : {}),
        use: true,
      };

      // 정렬 조건 생성
      const orderCondition: FindOptionsOrder<Campaign> = sortField
        ? { [sortField]: sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC" }
        : { created_at: "DESC" };

      // 데이터 조회
      const [campaigns, total] = await this.campaignRepository.findAndCount({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        order: orderCondition,
      });

      return {
        success: true,
        statusCode: HttpStatus.OK, // 200
        msg: "Campaigns retrieved successfully.",
        data: {
          campaigns,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
        msg: "Failed to retrieve campaigns.",
        data: error.message,
      };
    }
  };

  async getCampaignById(id: number): Promise<CampaignResponse> {
    try {
      const campaign = await this.campaignRepository.findOne({ where: { id, use: true } });
      if (!campaign) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND, // 404
          msg: "Campaign not found.",
          data: null,
        };
      }
      return {
        success: true,
        statusCode: HttpStatus.OK, // 200
        msg: "Campaign retrieved successfully.",
        data: campaign,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
        msg: "Failed to retrieve campaign.",
        data: error.message,
      };
    }
  };

  async updateCampaign(updateData: UpdateCampaignDto): Promise<CampaignResponse> {
    try {
      const { id, ...data } = updateData; // `id` 분리
      if (!id) {
        return {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST, // 400
          msg: "ID is required for updating a campaign.",
          data: null,
        };
      }

      const existingCampaign = await this.campaignRepository.findOne({ where: { id } });
      if (!existingCampaign) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND, // 404
          msg: "Campaign not found.",
          data: null,
        };
      }

      await this.campaignRepository.update(id, data);
      const updatedCampaign = await this.campaignRepository.findOne({ where: { id } });

      return {
        success: true,
        statusCode: HttpStatus.OK, // 200
        msg: "Campaign updated successfully.",
        data: updatedCampaign,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
        msg: "Failed to update campaign.",
        data: error.message,
      };
    }
  };

  async deleteCampaign(id: number): Promise<CampaignResponse> {
    try {
      const existingCampaign = await this.campaignRepository.findOne({ where: { id, use: true } });
      if (!existingCampaign) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND, // 404
          msg: "Campaign not found or already deactivated.",
          data: null,
        };
      }

      await this.campaignRepository.update(id, { use: false });
      return {
        success: true,
        statusCode: HttpStatus.OK, // 200
        msg: "Campaign deactivated successfully.",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
        msg: "Failed to deactivate campaign.",
        data: error.message,
      };
    }
  };

  async targetSearchList(data: TargetSearchListDto): Promise<CampaignResponse> {
    try {
      const { action, id } = data;
      // action 값이 없거나 잘못된 경우 예외 처리
      const allowedActions = ['uuid', 'product_id', 'user_id'];
      if (!action || !allowedActions.includes(action)) {
        return {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST, // 400
          msg: `Bad Request: 'action' must be one of [${allowedActions.join(', ')}]`,
          data: null,
        };
      }

      // WHERE 조건 동적 생성 (action을 키로 사용)
      const whereCondition = { [action]: id };

      // DB 조회
      const result = await this.campaignRepository.find({ where: whereCondition });

      // 결과 없음 (404)
      if (!result) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND, // 404
          msg: "Campaign not found",
          data: null,
        };
      }

      // 성공 응답 (200)
      return {
        success: true,
        statusCode: HttpStatus.OK, // 200
        msg: "Campaign retrieved successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error retrieving campaign:", error);
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // 500
        msg: "Failed to retrieve campaign",
        data: error.message,
      };
    }
  }
}