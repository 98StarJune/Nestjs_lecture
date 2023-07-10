import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from '../DTOs/Request/create.request.dto';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entitis/user.entity';
import { Repository } from 'typeorm';
import { ReadRequestDto } from '../DTOs/Request/read.request.dto';
import { DataResponseDto } from '../DTOs/Response/data.response.dto';
import { UpdateRequestDto } from '../DTOs/Request/update.request.dto';
import { DeleteRequestDto } from '../DTOs/Request/delete.request.dto';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from '../DTOs/Request/login.request.dto';
import { JwtService } from '@nestjs/jwt';
import { DefaultResponse } from '../DTOs/Response/interface.response.dto';
import { DefaultResponseDto } from '../DTOs/Response/default.response.dto';
import { JwtResponseDto } from '../DTOs/Response/jwt.response.dto';

@Injectable()
export class UserService {
  //변수
  creteResponseDto: CreateResponseDto;
  jwt: JwtService;
  defaultResponse: DefaultResponseDto;
  jwtResponse: JwtResponseDto;
  dataResponse: DataResponseDto;

  constructor(
    //생성자 파라메터
    createResponseDto: CreateResponseDto,
    jwtService: JwtService,
    DefaultResponse: DefaultResponseDto,
    JwtResponse: JwtResponseDto,
    DataResponse: DataResponseDto,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    //생성자
    this.creteResponseDto = createResponseDto;
    this.jwt = jwtService;
    this.defaultResponse = DefaultResponse;
    this.jwtResponse = JwtResponse;
    this.dataResponse = DataResponse;
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
      username: body.username,
      password: await bcrypt.hash(body.password, 12), // 암호화 필요
      email: body.email,
      birth: body.birth,
    };
    await this.userRepository.save(new_user);
    this.creteResponseDto.message = '성공했습니다.';
    return this.creteResponseDto;
  }

  async Read(
    param: ReadRequestDto,
  ): Promise<DefaultResponseDto | DataResponseDto> {
    if (param.username === undefined) {
      this.defaultResponse.statusCode = 400;
      this.defaultResponse.message = '올바르지 않은 요청입니다.';
      return this.defaultResponse;
    }
    const user: UserEntity = await this.userRepository.findOneBy({
      username: param.username,
    });
    if (!user) {
      this.defaultResponse.message = '존재하지 않는 사용자입니다.';
      this.defaultResponse.statusCode = 404;
      return this.defaultResponse;
    }
    this.dataResponse.data = user;
    this.dataResponse.message = '조회를 완료했습니다.';
    this.dataResponse.statusCode = 200;
    return this.dataResponse;
  }

  async Update(
    body: UpdateRequestDto,
  ): Promise<DefaultResponseDto | DataResponseDto> {
    const user: UserEntity = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (!user) {
      this.defaultResponse.message = '존재하지 않는 회원입니다.';
      this.defaultResponse.statusCode = 404;
      return this.defaultResponse;
    }
    if (body.password) {
      user.password = body.password;
    } else if (body.email) {
      user.email = body.email;
    } else if (body.birth) {
      user.birth = body.birth;
    }
    await this.userRepository.save(user);
    this.dataResponse.data = user;
    this.dataResponse.message = '성공적으로 변경했습니다.';
    this.dataResponse.statusCode = 200;
    return this.dataResponse;
  }

  async Delete(param: DeleteRequestDto): Promise<DefaultResponse> {
    const user: UserEntity = await this.userRepository.findOneBy({
      username: param.username,
    });
    if (!user) {
      this.defaultResponse.message = '존재하지 않는 사용자입니다.';
      this.defaultResponse.statusCode = 404;
      return this.defaultResponse;
    }
    await this.userRepository.delete({ username: param.username });
    this.defaultResponse.message = '정상적으로 처리되었습니다.';
    this.defaultResponse.statusCode = 200;
    return this.defaultResponse;
  }

  async Login(
    body: LoginRequestDto,
  ): Promise<DefaultResponseDto | JwtResponseDto> {
    //username이 있는가? => 회원인가? => 회원이 아닌 경우
    const user: UserEntity = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (!user) {
      //회원이 아닌 경우
      this.defaultResponse.statusCode = 404;
      this.defaultResponse.message = '존재하지 않는 회원입니다.';
      return this.defaultResponse;
    }

    //회원이라면 비밀번호가 일치하는가?
    // 비교 대상 : body.password를 암호화한게 DB에 있는거랑 똑같은가?
    const hash_result: boolean = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (hash_result === false) {
      this.defaultResponse.message = '비밀번호가 일치하지 않습니다.';
      this.defaultResponse.statusCode = 401;
      return this.defaultResponse;
    }
    //일치하면 JWT토큰 발급!
    const jwt: string = this.jwt.sign(
      {
        _id: user.id,
      },
      {
        secret: process.env.JWTSECRET,
        expiresIn: '1m',
      },
    );
    console.log(jwt);
    this.jwtResponse.statusCode = 200;
    this.jwtResponse.message = '로그인 완료';
    this.jwtResponse.jwt = jwt;
    return this.jwtResponse;
  }
}
