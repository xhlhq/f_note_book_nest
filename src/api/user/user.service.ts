/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 10:02:18
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-05 10:24:06
 * @Description: 
 */
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
import { ListUserDto } from './dto/list-user.dto';

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
    console.log("svg", session.code);
    console.log("svg-session", session);
    return svg.data
  }
  // 登录
  async login(loginUserDto: LoginUserDto, session) {
    console.log("code", session.code);
    console.log("session", session);
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
      code: 200,
      token: this.jwtService.sign(String(user.id)),
      message: '登录成功'
    };
  }
  // 注册
  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const user = await this.user.findOne({
      select: ['id'],
      where: {
        username: username,
        del: 0
      }
    });
    if (user !== null) {
      throw new HttpException('该用户名已注册账号', HttpStatus.NOT_FOUND);
    }
    const data = new User();
    const salt = await BcryptService.genSalt();
    const bcryptPassword = await BcryptService.hash(password, salt);
    data.username = username;
    data.password = bcryptPassword;
    this.user.save(data)
    return {
      code: 201,
      data: null,
      message: '注册成功'
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password, nickname, brief, phone, email, gender, birthday } = createUserDto

    const user = await this.user.findOne({
      select: ['id'],
      where: {
        username: username,
        del: 0
      }
    });
    if (user !== null) {
      throw new HttpException('该用户名已注册账号', HttpStatus.NOT_FOUND);
    }
    const data = new User();
    const salt = await BcryptService.genSalt();
    const bcryptPassword = await BcryptService.hash(password, salt);
    data.username = username;
    data.password = bcryptPassword;
    data.nickname = nickname;
    data.brief = brief;
    data.phone = phone;
    data.email = email;
    data.gender = gender;
    data.birthday = birthday;

    await this.user.save(data);

    return data;
  }

  async findAll(query: ListUserDto) {
    const { pageNum = 1, pageSize = 10, username = null, nickname = null, brief = null, phone = null, email = null, gender = null } = query;
    const skip = (pageNum - 1) * pageSize;
    const where = {
      username: !!username ? Like(`%${username}%`) : null,
      nickname: !!nickname ? Like(`%${nickname}%`) : null,
      brief: !!brief ? Like(`%${brief}%`) : null,
      phone: !!phone ? Like(`%${phone}%`) : null,
      email: !!email ? Like(`%${email}%`) : null,
      gender: !!gender ? gender : null,
      del: 0
    }
    const total = (await this.user.find({ where })).length;
    const list = await this.user.find({
      select: ['id', 'username', 'password', 'nickname', 'brief', 'phone', 'email', 'password', 'gender', 'createTime', 'updateTime', 'uuid', 'version', 'sort'],
      where,
      order: {
        sort: 'DESC'
      },
      skip: skip,
      take: pageSize,
    })
    return {
      total,
      pageNum,
      pageSize,
      list
    };
  }

  async findOne(id: number) {
    const user = await this.user.findOne({
      where: {
        id,
        del: 0
      }
    });
    if (!user) throw new HttpException('未找到该用户', HttpStatus.NOT_FOUND);
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { nickname, brief, phone, email, gender, birthday } = updateUserDto;
    const user = await this.user.findOne({
      where: {
        id,
        del: 0
      }
    });
    if (!user) throw new HttpException('未找到该用户', HttpStatus.NOT_FOUND);
    delete user.password;
    // 修改用户信息
    nickname && (user.nickname = nickname);
    brief && (user.brief = brief);
    phone && (user.phone = phone);
    email && (user.email = email);
    gender && (user.gender = gender);
    birthday && (user.birthday = birthday);

    this.user.save(user);

    return user;
  }

  async remove(id: number) {
    const user = await this.user.findOne({
      where: {
        id,
        del: 0,
      }
    })
    if (!user) throw new HttpException('未找到该用户', HttpStatus.NOT_FOUND);
    await this.user.update(id, { del: 1 })
    return {
      message: '删除成功'
    };
  }
}
