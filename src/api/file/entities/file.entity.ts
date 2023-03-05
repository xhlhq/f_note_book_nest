import { Entity, Column } from 'typeorm'
import BaseEntity from '../../../common/baseEntity'

@Entity()
export class MyFile extends BaseEntity {
  @Column({
    type: 'char',
    comment: '类型',
    length: '40',
    default: 'other'
  })
  type: string

  @Column({
    type: 'char',
    comment: '副类型',
    length: '40',
    default: 'other'
  })
  subType: string

  @Column({
    type: 'int',
    comment: '文章id',
    default: null
  })
  articleId: number

  @Column({
    type: 'char',
    comment: '字段名',
    length: '10',
    default: null
  })
  fieldname: string

  @Column({
    type: 'char',
    comment: '原名称',
    length: '30',
    default: null
  })
  originalname: string

  @Column({
    type: 'char',
    comment: '编码',
    length: '16',
    default: null
  })
  encoding: string

  @Column({
    type: 'char',
    comment: '文件格式',
    length: '30',
    default: null
  })
  mimetype: string

  @Column({
    type: 'char',
    comment: '文件夹路径',
    length: '100',
    default: null
  })
  destination: string

  @Column({
    type: 'char',
    comment: '文件名',
    length: '50',
    default: null
  })
  filename: string

  @Column({
    type: 'char',
    comment: '文件路径',
    length: '150',
    default: null
  })
  path: string

  @Column({
    type: 'int',
    comment: '文件大小',
    default: null
  })
  size: number
}
