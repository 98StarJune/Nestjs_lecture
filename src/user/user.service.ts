import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from "../DTOs/Request/create.request.dto";

@Injectable()
export class UserService {
  // 가입
  Create(data: CreateRequestDto){

  }
}