import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateRequestDto } from '../DTOs/Request/create.request.dto';

@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post('create')
  Create(@Body() data: CreateRequestDto) {
    //Service 연결
    const result = this.userService.Create(data);

    //데이터 반환
    return result;
  }

  @Get('search')
  Search(data) {}
}
