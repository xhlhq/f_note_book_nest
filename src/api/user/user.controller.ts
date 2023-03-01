/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:32:58
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-24 22:37:21
 * @FilePath: \f_note_book_nest\src\api\user\user.controller.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Session, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './auth/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('code')
  getCaptchaCode(@Session() session) {
    return this.userService.getCaptchaCode(session);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Session() session) {
    return this.userService.login(loginUserDto, session);
  }

  @Post('register')
  @SetMetadata("message", '注册成功')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@CurrentUser() user: User) {
    console.log("user", user);
    return user;
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
