/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:21:42
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-23 17:11:12
 * @FilePath: \f_note_book_nest\src\common\response.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { map } from "rxjs/operators"
import { Observable } from "rxjs";

interface Data<T> {
  data: T
}

// 全局响应拦截器
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    return next.handle().pipe(map(data => {
      return {
        data,
        message: "获取成功",
      }
    }))
  }
}