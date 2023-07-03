interface LoginRequest {
  username: string;
  password: string;
}

export class LoginRequestDto implements LoginRequest{
  username: string;
  password: string;
}