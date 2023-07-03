import { UserEntity } from '../../Entitis/user.entity';

export interface DefaultResponse {
  message: string;
  statusCode: number;
}

export interface JwtResponse extends DefaultResponse {
  jwt: string;
}

export interface DataResponse extends DefaultResponse {
  data: UserEntity;
}
