import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateRequestDto } from '../DTOs/Request/create.request.dto';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { ReadRequestDto } from '../DTOs/Request/read.request.dto';
import { ReadResponseDto } from '../DTOs/Response/read.response.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  //회원가입 (C)
  @Post('join')
  async Join(@Body() body: CreateRequestDto): Promise<CreateResponseDto> {
    const result: CreateResponseDto = await this.userService.Join(body);
    return result;
  }

  //회원 조회 (R)
  @Get('read')
  async Read(@Res() res: Response, @Body() body: ReadRequestDto): Promise<Response> {
    const result: ReadResponseDto = await this.userService.Read(body);
    return res.status(result.statusCode).json(result);
  }
}
