import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common"
import { Request, Response } from "express"
import { isArray, isString } from 'lodash'

// 全局异常拦截器
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    let message: string = '';
    const err = exception.getResponse();
    if (isString(err)) {
      message = err;
    } else {
      const msg = (err as { message }).message;
      if (isString(msg)) {
        message = msg
      } else if (isArray(msg)) {
        message = msg.length > 0 ? msg[0] : '未知错误'
      }
    }
    response.status(status).json({
      status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}