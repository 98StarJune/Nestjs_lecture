import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entitis/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DeleteRequestDto } from '../DTOs/Request/delete.request.dto';
import { JwtResponseDto } from '../DTOs/Response/jwt.response.dto';
import { DataResponseDto } from '../DTOs/Response/data.response.dto';
import { DefaultResponseDto } from '../DTOs/Response/default.response.dto';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    CreateResponseDto,
    JwtService,
    DeleteRequestDto,
    DefaultResponseDto,
    JwtResponseDto,
    DataResponseDto,
  ],
})
export class UserModule {}
