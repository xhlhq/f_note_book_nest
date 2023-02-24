/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-23 17:20:50
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-23 21:24:30
 * @FilePath: \f_note_book_nest\src\common\baseEntity.ts
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '主键'
  })
  id: number

  @Column({
    comment: 'uuid主键'
  })
  @Generated("uuid")
  uuid: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间'
  })
  createTime: string;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间'
  })
  updateTime: string;

  @VersionColumn({
    type: 'char',
    comment: '版本'
  })
  version: string;

  // 0未删除 1已删除
  @Column({
    type: "tinyint",
    default: 0,
    comment: '删除状态',
    select: false
  })
  del: number
}