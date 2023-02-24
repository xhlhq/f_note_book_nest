import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './entities/user.entity'
import { HttpException, HttpStatus } from '@nestjs/common';
import BcryptService from 'src/utils/bcrypt';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {

    // 设置登录时用的 账号和密码字段
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions)
  }

  async validate(username: string, password: string) {
    const user = await this.user.findOne({
      select: ['username', 'password'],
      where: {
        username: username,
        del: 0
      }
    });
    if (user === null) {
      throw new HttpException('该用户名未注册账号', HttpStatus.NOT_FOUND);
    }
    const bcryptPassword = await BcryptService.compare(password, user.password);
    if (!bcryptPassword) {
      throw new HttpException('密码不正确', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}