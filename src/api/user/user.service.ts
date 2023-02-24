import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import * as svgCaptcha from 'svg-captcha';
import { Repository, Like } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import BcryptService from 'src/utils/bcrypt';
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }
  getCaptchaCode(session) {
    const svg = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 120,
      height: 40,
      background: '#cc9966',
    });
    console.log("svg", svg.text)
    session.code = svg.text;
    return svg.data
  }
  async login(loginUserDto: LoginUserDto, session) {
    if (!session.code) {
      throw new HttpException('验证码已失效', HttpStatus.UNAUTHORIZED);
    }
    if (session.code.toLowerCase() !== loginUserDto.code.toLowerCase()) {
      throw new HttpException('验证码错误', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.user.findOne({
      select: ['username', 'password'],
      where: {
        username: loginUserDto.username,
        del: 0
      }
    });
    if (user === null) {
      throw new HttpException('该用户名未注册账号', HttpStatus.NOT_FOUND);
    }
    const bcryptPassword = await BcryptService.compare(loginUserDto.password, user.password);
    if (!bcryptPassword) {
      throw new HttpException('密码不正确', HttpStatus.UNAUTHORIZED);
    }
    return loginUserDto;
  }
  async register(createUserDto: CreateUserDto) {
    const data = new User();
    const salt = await BcryptService.genSalt();
    const bcryptPassword = await BcryptService.hash(createUserDto.password, salt);
    data.username = createUserDto.username;
    data.password = bcryptPassword;
    console.log("salt", salt);
    return this.user.save(data);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
