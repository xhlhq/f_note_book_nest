/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:32:58
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-01 21:09:12
 * @FilePath: \f_note_book_nest\src\api\user\dto\create-user.dto.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { IsNotEmpty, IsString, Length } from "class-validator"
export class CreateUserDto {
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

  /**
   * 昵称
   */
  nickname: string;
  /**
  * 简介
  */
  brief: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 手机号
   */
  phone: string;

  /**
 * 生日
 */
  birthday: string;
  /**
   * 性别
   */
  gender: string;
}
