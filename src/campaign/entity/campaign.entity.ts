import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("campaign")
export class Campaign {
  @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 128, nullable: true })
  product_id?: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  campaign_id?: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  uuid?: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  user_id?: string;

  @Column({ type: "bigint", unsigned: true, default: 0 })
  view_count: number;

  @Column({ type: "bigint", unsigned: true, default: 0 })
  like_count: number;

  @Column({ type: "bigint", unsigned: true, default: 0 })
  share_count: number;

  @Column({ type: "varchar", length: 256, nullable: true })
  short_link?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 512, nullable: true })
  image_url?: string;

  @Column({ type: "varchar", length: 512, nullable: true })
  video_url?: string;

  @Column({ type: "boolean", default: true })
  use: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;
}
