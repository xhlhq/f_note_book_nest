/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 11:13:09
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-03 16:53:51
 * @FilePath: \f_note_book_nest\src\main.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { HttpFilter } from "./common/filter"
import { CommonResponse } from "./common/commonResponse"
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 配置静态资源访问目录
  // 加上虚拟路径
  // app.useStaticAssets(join(__dirname, 'images'), {
  //   prefix: "images"
  // })
  app.useStaticAssets(join(__dirname, 'images'))


  // websocket 适配器
  app.useWebSocketAdapter(new IoAdapter(app));

  // 跨域
  app.use(cors());

  // 设置统一前缀
  app.setGlobalPrefix('v1');
  // 设置版本号
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Api-Version', // 在 header 中标记的 Api-Version 标签就是指定的版本号
  });
  // 设置session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      rolling: true,
      cookie: { maxAge: 60 * 1000 },
    }),
  );
  // 数据验证
  app.useGlobalPipes(new ValidationPipe());
  // 配置异常拦截器
  app.useGlobalFilters(new HttpFilter());
  // 配置响应全局拦截器
  app.useGlobalInterceptors(new CommonResponse());

  // swagger 的配置项
  const options = new DocumentBuilder().addBearerAuth().setTitle("博客").setDescription("fanw的博客接口文档").setVersion("1.0.0").build();
  // 创建 swagger文档
  const document = SwaggerModule.createDocument(app, options);
  // 启动
  SwaggerModule.setup("/api-docs", app, document);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
