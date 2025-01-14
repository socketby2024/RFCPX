import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CampaignModule } from './campaign/campaign.module';
import { Campaign } from './campaign/entity/campaign.entity';


@Module({
  imports: [
    // 글로벌 설정으로 .env 파일 읽기
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM 연결 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Campaign],
      synchronize: false,
      timezone: process.env.MYSOL_TZ,
    }),

    // CampaignModule 연결
    CampaignModule,
  ],
})

export class AppModule {}
