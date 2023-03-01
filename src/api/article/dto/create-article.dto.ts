/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 10:02:18
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-01 13:51:21
 * @Description: 
 */
import { IsNotEmpty } from "class-validator"

export class CreateArticleDto {
  @IsNotEmpty({
    message: "文章标题不能为空"
  })
  title: string;

  @IsNotEmpty({
    message: "文章内容不能为空"
  })
  content: string;

  @IsNotEmpty({
    message: "文章类型不能为空"
  })
  classifyId: number

  subTitle: string

  cover: string

  keywordIds: string

  description: string

  resource: string
}
