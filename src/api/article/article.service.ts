/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 10:02:18
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 23:22:59
 * @Description: 
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleContent } from './entities/article.entity';
import { User } from '../user/entities/user.entity';
import { Classify } from '../classify/entities/classify.entity';
import { Keyword } from '../keyword/entities/keyword.entity';


@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly article: Repository<Article>,
    @InjectRepository(ArticleContent) private readonly articleContent: Repository<ArticleContent>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Classify) private readonly classify: Repository<Classify>,
    @InjectRepository(Keyword) private readonly keyword: Repository<Keyword>) { }

  async create(createArticleDto: CreateArticleDto) {
    console.log("创建文章", createArticleDto);

    // 获取文章分类
    const classify = await this.classify.findOne({
      where: {
        id: createArticleDto.classify
      }
    })
    if (!classify) throw new HttpException('不存在该文章分类', HttpStatus.BAD_REQUEST);

    // 创建文章内容
    const articleContent = new ArticleContent()
    articleContent.content = createArticleDto.content
    await this.articleContent.save(articleContent)

    // 创建文章
    const article = new Article()
    article.title = createArticleDto.title
    article.content = articleContent
    article.classify = classify
    const result = await this.article.save(article)

    return result;
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
