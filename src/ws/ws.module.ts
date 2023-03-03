/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-03-02 10:13:21
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-02 10:17:00
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { WsGateway } from './events.gateway';

@Module({
  providers: [WsGateway],
})
export class EventsModule { }
