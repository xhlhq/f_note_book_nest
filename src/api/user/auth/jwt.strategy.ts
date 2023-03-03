/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 13:36:51
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-02 21:13:50
 * @FilePath: \f_note_book_nest\src\api\user\jwt.strategy.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from '../entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 取出token
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(id: string) {

    const uid = Number(id);
    if (isNaN(uid)) {
      return {}
    }
    const user = await this.user.findOne({
      where: {
        id: uid,
        del: 0
      }
    })
    delete user.password;
    return user;
  }
}