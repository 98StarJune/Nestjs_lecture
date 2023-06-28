import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateRequestDto } from '../DTOs/Request/create.request.dto';
import { CreateResponseDto } from '../DTOs/Response/create.response.dto';
import { ReadRequestDto } from '../DTOs/Request/read.request.dto';
import { ResponseDto } from '../DTOs/Response/responseDto';
import { Response } from 'express';
import { UpdateRequestDto } from '../DTOs/Request/update.request.dto';
import { DeleteRequestDto } from '../DTOs/Request/delete.request.dto';

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

  @Get('read')
  async Read(
    @Res() res: Response,
    @Query() param: ReadRequestDto,
  ): Promise<Response> {
    console.log(param);
    const result: ResponseDto = await this.userService.Read(param);
    return res.status(result.statusCode).json(result);
  }

  @Post('update')
  async Update(
    @Res() res: Response,
    @Body() body: UpdateRequestDto,
  ): Promise<Response> {
    const result: ResponseDto = await this.userService.Update(body);
    return res.status(result.statusCode).json(result);
  }
  @Get('delete')
  async Delete(@Res() res: Response, @Query() param: DeleteRequestDto) {
    const result: ResponseDto = await this.userService.Delete(param);
    return res.status(result.statusCode).json(result);
  }
}
