import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Item } from './src/items/entities/item.entity';
import { Listing } from './src/items/entities/listing.entity';
import { Comment } from './src/items/entities/comment.entity';
import { Tag } from './src/items/entities/tag.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type:"postgres",
  host: configService.getOrThrow('DATABASE_HOST'),
  port: configService.getOrThrow('DATABASE_PORT'),
  database: configService.getOrThrow('DATABASE_DATABASE'),
  username: configService.getOrThrow('DATABASE_USER'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  migrations: ['migrations/**'],
  entities: [Item, Listing, Comment, Tag],
});
