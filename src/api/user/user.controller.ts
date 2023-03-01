/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:32:58
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-01 20:23:15
 * @FilePath: \f_note_book_nest\src\api\user\user.controller.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport';
import { ListUserDto } from './dto/list-user.dto';

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
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() query: ListUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {

    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
