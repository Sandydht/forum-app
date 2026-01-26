export interface UserLoginRequestDto {
  username: string;
  password: string;
  captchaToken: string;
}