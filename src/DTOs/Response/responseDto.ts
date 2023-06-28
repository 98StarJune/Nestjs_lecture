import { UserEntity } from '../../Entitis/user.entity';

interface Response {
  data: UserEntity | void;
  message: string;
  statusCode: number;
}

export class ResponseDto implements Response {
  data: UserEntity;
  message: string;
  statusCode: number;
}
