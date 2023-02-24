/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:32:58
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-24 09:50:01
 * @FilePath: \f_note_book_nest\src\api\user\user.controller.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto'

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
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new HttpException('您无权登录', HttpStatus.FORBIDDEN);
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
