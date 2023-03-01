/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-28 22:42:01
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-01 22:09:12
 * @Description: 
 */
import { IsNotEmpty } from "class-validator"

export class CreateKeywordDto {
  @IsNotEmpty({
    message: '关键字名称不能为空'
  })
  name: string

  status: number
}
