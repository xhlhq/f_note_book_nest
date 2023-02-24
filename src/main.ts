/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 11:13:09
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-23 20:33:34
 * @FilePath: \f_note_book_nest\src\main.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { HttpFilter } from "./common/filter"
import { Response } from "./common/response"
import DEFAULT_CONFIG from './config/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
      secret: DEFAULT_CONFIG.SESSION_SECRET,
      rolling: true,
      cookie: { maxAge: 60 * 1000 },
    }),
  );
  // 数据验证
  app.useGlobalPipes(new ValidationPipe());
  // 配置异常拦截器
  app.useGlobalFilters(new HttpFilter());
  // 配置响应全局拦截器
  app.useGlobalInterceptors(new Response());

  // swagger 的配置项
  const options = new DocumentBuilder().setTitle("博客").setDescription("fanw的博客接口文档").setVersion("1.0.0").build();
  // / 需要添加权限
  // const options = new DocumentBuilder().addBearerAuth().setTitle("swagger文档标题").setDescription("描述").setVersion("版本1").build();
  // 创建 swagger文档
  const document = SwaggerModule.createDocument(app, options);
  // 启动
  SwaggerModule.setup("/api-docs", app, document);
  await app.listen(3010);
}
bootstrap();
