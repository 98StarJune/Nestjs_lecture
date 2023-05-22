interface ICreateRequestDto {
  username: string;
  password: string;
  email: string;
  birth: string;
} // 명세서

export class CreateRequestDto implements ICreateRequestDto {
  username;
  password;
  email;
  birth;
}