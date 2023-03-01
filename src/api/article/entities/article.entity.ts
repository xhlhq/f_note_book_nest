import { Entity, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { User } from 'src/api/user/entities/user.entity'
import BaseEntity from '../../../common/baseEntity'
import { Classify } from 'src/api/classify/entities/classify.entity'
import { Keyword } from 'src/api/keyword/entities/keyword.entity'

@Entity()
export class ArticleContent extends BaseEntity {
  @Column({
    type: 'mediumtext',
    comment: '内容',
  })
  content: string
}

@Entity()
export class Article extends BaseEntity {
  @Column({
    type: 'char',
    comment: '标题',
    length: '80',
  })
  title: string

  @Column({
    type: 'char',
    comment: '副标题',
    length: '120',
    default: null
  })
  subTitle: string

  @Column({
    type: 'char',
    comment: '封面',
    length: '80',
    default: null
  })
  cover: string

  @Column({
    type: 'char',
    comment: '描述',
    length: '250',
    default: null
  })
  description: string

  @Column({
    type: 'char',
    comment: '来源',
    length: '250',
    default: null
  })
  resource: string

  // 文章内容
  @OneToOne(() => ArticleContent)
  @JoinColumn()
  content: ArticleContent;

  // 分类
  @ManyToOne(() => Classify, classify => classify.articles)
  classify: Classify

  // 关键字
  @ManyToMany(() => Keyword)
  @JoinTable()
  keywords: Keyword[];

  // 作者
  @ManyToOne(() => User, user => user.articles)
  author: User

  @Column({
    type: 'tinyint',
    comment: '状态',
    default: 0,
  })
  status: number

}
