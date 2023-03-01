import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import * as svgCaptcha from 'svg-captcha';
import { Repository, Like } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import BcryptService from 'src/utils/bcrypt';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>, private jwtService: JwtService) { }

  // 获取验证码
  getCaptchaCode(session) {
    const svg = svgCaptcha.create({
      size: 4,
      fontSize: 36,
      width: 120,
      height: 30,
      ignoreChars: '0oIl',
      noise: 3,
      background: '#3949ab',
    });
    session.code = svg.text;
    return svg.data
  }
  // 登录
  async login(loginUserDto: LoginUserDto, session) {
    if (!session.code) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }
    if (session.code.toLowerCase() !== loginUserDto.code.toLowerCase()) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }
    const user = await this.user.findOne({
      select: ['id', 'username', 'password'],
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
      throw new HttpException('密码不正确', HttpStatus.BAD_REQUEST);
    }
    return {
      token: this.jwtService.sign(String(user.id)),
      message: '登录成功'
    };
  }
  // 注册
  async register(createUserDto: CreateUserDto) {
    const data = new User();
    const user = await this.user.findOne({
      select: ['id'],
      where: {
        username: createUserDto.username,
        del: 0
      }
    });
    if (user !== null) {
      throw new HttpException('该用户名已注册账号', HttpStatus.NOT_FOUND);
    }
    const salt = await BcryptService.genSalt();
    const bcryptPassword = await BcryptService.hash(createUserDto.password, salt);
    data.username = createUserDto.username;
    data.password = bcryptPassword;
    this.user.save(data)
    return;
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
