import type RegisterUser from "../../../domain/users/entity/RegisterUser"

class RegisterUserRequestDto {
  public username: string
  public email: string
  public phoneNumber: string
  public fullname: string
  public password: string
  public captchaToken: string

  constructor(registerUser: RegisterUser) {
    this.username = registerUser.getUsername()
    this.email = registerUser.getEmail()
    this.phoneNumber = registerUser.getPhoneNumber()
    this.fullname = registerUser.getFullname()
    this.password = registerUser.getPassword()
    this.captchaToken = registerUser.getCaptchaToken()
  }
}

export default RegisterUserRequestDto
