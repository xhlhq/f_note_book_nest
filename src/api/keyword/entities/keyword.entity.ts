/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-28 22:42:01
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 23:20:24
 * @Description: 
 */
import { Entity, Column } from 'typeorm'
import BaseEntity from '../../../common/baseEntity'

@Entity()
export class Keyword extends BaseEntity {

  @Column({
    type: 'char',
    comment: '名称',
    length: '40',
    unique: true
  })
  name: string

  @Column({
    type: 'tinyint',
    comment: '状态',
    default: 0,
  })
  status: number
}
