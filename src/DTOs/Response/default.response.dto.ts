import { DefaultResponse } from './interface.response.dto';

export class DefaultResponseDto implements DefaultResponse {
  message: string;
  statusCode: number;
}
