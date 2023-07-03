import { DefaultResponseDto } from './default.response.dto';
import { JwtResponse } from './interface.response.dto';

export class JwtResponseDto extends DefaultResponseDto implements JwtResponse {
  jwt: string;
}
