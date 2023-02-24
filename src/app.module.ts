/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 11:13:09
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-23 15:09:43
 * @FilePath: \f_note_book_nest\src\app.module.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './middleware/log/log.middleware';
import { UserModule } from './api/user/user.module'
import { ArticleModule } from './api/article/article.module'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql", //数据库类型
    host: "localhost", //host
    port: 3306, // 端口
    username: "root", //账号
    password: "plmoknijb0987", //密码
    database: "f_note_book", // 库名
    // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
    synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库 // 开发环境使用 生产环境不要使用
    retryDelay: 500, //重试连接数据库间隔
    retryAttempts: 10,//重试连接数据库的次数
    autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  }), UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
