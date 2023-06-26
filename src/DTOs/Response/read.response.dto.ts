import { UserEntity } from '../../Entitis/user.entity';

interface ReadResponse {
  data: UserEntity | void;
  message: string;
  statusCode: number;
}

export class ReadResponseDto implements ReadResponse {
  data: UserEntity;
  message: string;
  statusCode: number;
}
