import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 设置登录时用的 账号和密码字段
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions)
  }

  async validate(username: string, password: string) {

  }
}