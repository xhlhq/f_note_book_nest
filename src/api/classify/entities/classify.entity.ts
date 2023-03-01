/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-28 22:41:30
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 23:08:22
 * @Description: 文章分类表
 */
import { Article } from 'src/api/article/entities/article.entity'
import { Entity, Column, OneToMany } from 'typeorm'
import BaseEntity from '../../../common/baseEntity'

@Entity()
export class Classify extends BaseEntity {
  @Column({
    type: 'char',
    comment: '名称',
    length: '40',
    unique: true,
  })
  name: string

  @Column({
    type: 'char',
    comment: '分类值',
    length: '40',
    unique: true
  })
  value: string

  @Column({
    type: 'char',
    comment: '类型',
    length: '40',
    default: null
  })
  type: string

  @OneToMany(() => Article, article => article.author)
  articles: Article[];

  @Column({
    type: 'tinyint',
    comment: '状态',
    default: 0,
  })
  status: number
}
