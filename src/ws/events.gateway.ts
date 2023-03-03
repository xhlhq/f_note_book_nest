/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-03-02 10:13:48
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-02 10:33:21
 * @Description: 
 */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(3012, {
  transports: ['websocket']
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
