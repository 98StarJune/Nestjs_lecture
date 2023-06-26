import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entitis/user.entity';
import { ReadResponseDto } from '../DTOs/Response/read.response.dto';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, CreateResponseDto, ReadResponseDto],
})
export class UserModule {}
