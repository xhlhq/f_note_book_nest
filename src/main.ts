/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 11:13:09
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-05 11:10:24
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
import rateLimit from 'express-rate-limit';
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
  // app.use(cors());

  // 设置统一前缀
  app.setGlobalPrefix('v1');
  // 限制访问次数
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  // 设置版本号
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Api-Version', // 在 header 中标记的 Api-Version 标签就是指定的版本号
  });
  // 设置session
  app.use(
    session({
      name: 'note.sid', // 返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置
      secret: process.env.SESSION_SECRET, // 密钥，一个 String 类型的字符串，作为服务器端生成 session 的签名
      resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
      saveUninitialized: true, // 强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默 认：true）。
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // cookie配置，设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
      rolling: true, // 在每次请求时强行设置 cookie，重置 cookie 过期时间（默认：false）
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
