/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 14:00:53
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-24 14:07:19
 * @FilePath: \f_note_book_nest\src\api\user\auth\current-user.decorator.ts
 * @Description: 自定义获取user的参数装饰器
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// 自定义参数装饰器
export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return req.user;
})
