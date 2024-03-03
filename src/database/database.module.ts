import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // it will throw error if the database in not connected
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        database: configService.getOrThrow('DATABASE_DATABASE'),
        username: configService.getOrThrow('DATABASE_USER'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        // detect db models automatically
        autoLoadEntities: true,
        // syncs database with typeorm on every app relaunch 
        // but it could cause data loss on production
        synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE')
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
