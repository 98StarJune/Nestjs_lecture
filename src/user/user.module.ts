import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entitis/user.entity';
import { ResponseDto } from '../DTOs/Response/responseDto';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, CreateResponseDto, ResponseDto],
})
export class UserModule {}
