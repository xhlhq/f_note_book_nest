import { IsNotEmpty, IsString, Length } from "class-validator"
export class LoginUserDto {
  @IsNotEmpty({
    message: "用户名不能为空"
  })
  @IsString({
    message: "用户名必须是字符串"
  })
  @Length(2, 10, {
    message: "用户名长度为2-10"
  })
  username: string;
  @IsNotEmpty({
    message: "密码不能为空"
  })
  @Length(8, 32, {
    message: "密码长度为8-32"
  })
  password: string;
  @IsNotEmpty({
    message: "验证码不能为空"
  })
  code: string
}