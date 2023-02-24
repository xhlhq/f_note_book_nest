/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 21:38:23
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-23 22:00:47
 * @FilePath: \f_note_book_nest\src\utils\bcrypt.ts
 * @Description: 专门用于密码加密
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export default class BcryptService {
  private static readonly SALT_ROUNDS: number = 10
  /**
  * 对比检查密码
  * @param password // 密码
  * @param hashedPassword // 已加密的密码
  * @return Boolean // 返回 boolean
  */
  static async compare(rawStr: string, hashedPassword: string) {
    return bcrypt.compare(rawStr, hashedPassword)
  }
  /**
  * 生成 hash 
  * @param password // 要加密的密码
  * @param salt // genSalt 生成的盐
  * @return // 返回加密后的密码
  */
  static async hash(password: string, salt?: string) {
    return bcrypt.hash(password, salt || BcryptService.SALT_ROUNDS)
  }
  /**
  * 生成盐
  */
  static async genSalt() {
    return bcrypt.genSalt(BcryptService.SALT_ROUNDS)
  }
}
