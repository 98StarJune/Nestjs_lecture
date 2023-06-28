import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entitis/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nest1.mariadb.database.azure.com',
      port: 3306,
      username: 'nestroot@nest1', //mysql 접속 할 때 쓰는 id
      password: 'Nest2023@',
      database: 'starjune', //쓰고 싶은 이름 (DB이름)
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
