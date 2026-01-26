import type RegisteredUser from "../../../domain/users/entity/RegisteredUser"

class RegisterUserResponseDto {
  public id: string
  public username: string
  public email: string
  public phoneNumber: string
  public fullname: string

  constructor(registeredUser: RegisteredUser) {
    this.id = registeredUser.getId()
    this.username = registeredUser.getUsername()
    this.email = registeredUser.getEmail()
    this.phoneNumber = registeredUser.getPhoneNumber()
    this.fullname = registeredUser.getFullname()
  }
}

export default RegisterUserResponseDto
