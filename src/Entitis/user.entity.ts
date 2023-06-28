import { DefaultEntity } from './default.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends DefaultEntity{
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  birth: string;
}
