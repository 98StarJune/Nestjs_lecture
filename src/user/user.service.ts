import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from '../DTOs/Request/create.request.dto';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entitis/user.entity';
import { Repository } from 'typeorm';
import { ReadRequestDto } from '../DTOs/Request/read.request.dto';
import { ReadResponseDto } from '../DTOs/Response/read.response.dto';

@Injectable()
export class UserService {
  creteResponseDto: CreateResponseDto;
  readResponseDto: ReadResponseDto;

  constructor(
    createResponseDto: CreateResponseDto,
    readResponseDto: ReadResponseDto,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    this.creteResponseDto = createResponseDto;
  }

  // 가입
  async Join(body: CreateRequestDto): Promise<CreateResponseDto> {
    const user = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (user) {
      this.creteResponseDto.message = '이미 존재하는 사용자입니다.';
      return this.creteResponseDto;
    }
    const new_user = {
      id: 1,
      username: body.username,
      password: body.password,
      email: body.email,
      birth: body.birth,
    };
    await this.userRepository.save(new_user);
    this.creteResponseDto.message = '성공했습니다.';
    return this.creteResponseDto;
  }

  async Read(body: ReadRequestDto): Promise<ReadResponseDto> {
    const user: UserEntity = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (!user) {
      this.readResponseDto.data = null;
      this.readResponseDto.message = '존재하지 않는 사용자입니다.';
      this.readResponseDto.statusCode = 404;
      return this.readResponseDto;
    }
    this.readResponseDto.data = user;
    this.readResponseDto.message = '조회를 완료했습니다.';
    this.readResponseDto.statusCode = 200;
    return this.readResponseDto;
  }
}
