import { UserEntity } from '../../Entitis/user.entity';
import { DefaultResponseDto } from './default.response.dto';
import { DataResponse } from './interface.response.dto';

export class DataResponseDto
  extends DefaultResponseDto
  implements DataResponse
{
  data: UserEntity;
}
