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
import { CommonModule } from './libs/common/src';

@Module({
  imports: [CommonModule, UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
