/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 11:53:59
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-24 12:19:57
 * @FilePath: \f_note_book_nest\src\libs\db\src\db.module.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory() {
      return {
        type: 'mysql',
        host: process.env.MYSQL_HOST, //host
        port: Number(process.env.MYSQL_PORT), // 端口
        username: process.env.MYSQL_USERNAME, //账号
        password: process.env.MYSQL_PASSWORD, //密码
        database: process.env.MYSQL_DATABASE, // 库名
        // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
        synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库 // 开发环境使用 生产环境不要使用
        retryDelay: Number(process.env.MYSQL_RETRY_DELAY), //重试连接数据库间隔
        retryAttempts: Number(process.env.MYSQL_RETRY_ATTEMPTS),//重试连接数据库的次数
        autoLoadEntities: true, //如果为true,将自动加
      }
    }
  })],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule { }
