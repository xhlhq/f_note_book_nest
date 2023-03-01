/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 14:32:58
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 22:37:20
 * @FilePath: \f_note_book_nest\src\api\user\entities\user.entity.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Article } from 'src/api/article/entities/article.entity'
import { Entity, Column, OneToMany } from 'typeorm'
import BaseEntity from '../../../common/baseEntity'

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'char',
    comment: '用户名',
    length: '48',
  })
  username: string

  @Column({
    type: 'char',
    comment: '密码',
    length: '255',
  })
  password: string

  @Column({
    type: 'char',
    comment: '昵称',
    length: '255',
    default: null
  })
  nickname: string

  @Column({
    type: 'char',
    comment: '简介',
    length: '255',
    default: null
  })
  brief: string

  @Column({
    type: 'char',
    comment: '联系电话',
    length: '36',
    default: null
  })
  phone: string

  @Column({
    type: 'char',
    comment: '邮箱',
    length: '48',
    default: null
  })
  email: string

  @Column({
    type: 'date',
    comment: '生日',
    default: null
  })
  birthday: string

  @Column({
    type: 'char',
    comment: '性别',
    length: '36',
    default: null
  })

  // 作者文章
  @OneToMany(() => Article, article => article.author)
  articles: Article[];

  gender: string
}
