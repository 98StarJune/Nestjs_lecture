import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from '../DTOs/Request/create.request.dto';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entitis/user.entity';
import { Repository } from 'typeorm';
import { ReadRequestDto } from '../DTOs/Request/read.request.dto';
import { ResponseDto } from '../DTOs/Response/responseDto';
import { UpdateRequestDto } from '../DTOs/Request/update.request.dto';
import { DeleteRequestDto } from '../DTOs/Request/delete.request.dto';

@Injectable()
export class UserService {
  creteResponseDto: CreateResponseDto;
  responseDto: ResponseDto;

  constructor(
    createResponseDto: CreateResponseDto,
    ResponseDto: ResponseDto,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    this.creteResponseDto = createResponseDto;
    this.responseDto = ResponseDto;
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

  async Read(param: ReadRequestDto): Promise<ResponseDto> {
    if (param.username === undefined) {
      this.responseDto.statusCode = 400;
      this.responseDto.message = '올바르지 않은 요청입니다.';
      return this.responseDto;
    }
    const user: UserEntity = await this.userRepository.findOneBy({
      username: param.username,
    });
    if (!user) {
      this.responseDto.data = null;
      this.responseDto.message = '존재하지 않는 사용자입니다.';
      this.responseDto.statusCode = 404;
      return this.responseDto;
    }
    this.responseDto.data = user;
    this.responseDto.message = '조회를 완료했습니다.';
    this.responseDto.statusCode = 200;
    return this.responseDto;
  }

  async Update(body: UpdateRequestDto): Promise<ResponseDto> {
    const user: UserEntity = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (!user) {
      this.responseDto.message = '존재하지 않는 회원입니다.';
      this.responseDto.statusCode = 404;
      return this.responseDto;
    }
    if (body.password) {
      user.password = body.password;
    } else if (body.email) {
      user.email = body.email;
    } else if (body.birth) {
      user.birth = body.birth;
    }
    await this.userRepository.save(user);
    this.responseDto.data = user;
    this.responseDto.message = '성공적으로 변경했습니다.';
    this.responseDto.statusCode = 200;
    return this.responseDto;
  }

  async Delete(param: DeleteRequestDto): Promise<ResponseDto> {
    const user: UserEntity = await this.userRepository.findOneBy({
      username: param.username,
    });
    if (!user) {
      this.responseDto.message = '존재하지 않는 사용자입니다.';
      this.responseDto.statusCode = 404;
      return this.responseDto;
    }
    await this.userRepository.delete({ username: param.username });
    this.responseDto.message = '정상적으로 처리되었습니다.';
    this.responseDto.statusCode = 200;
    return this.responseDto;
  }
}
