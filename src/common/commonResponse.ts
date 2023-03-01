/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:21:42
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 22:25:57
 * @FilePath: \f_note_book_nest\src\common\response.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { map } from "rxjs/operators"
import { Observable } from "rxjs";
import { Response } from 'express';

interface Data<T> {
  data: T
}
// 全局响应拦截器
@Injectable()
export class CommonResponse<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    const res = context.switchToHttp().getResponse<Response>();
    const statusCode = res.statusCode;
    let message = '成功';
    if (statusCode === 201) {
      message = '创建成功'
    }
    return next.handle().pipe(map(data => {
      let response = {
        data,
        message,
      };
      // 如果data里面有message字段，则直接返回data, 如果没有，采用默认的返回
      if (data?.message) {
        response = data;
      }
      return response
    }))
  }
}