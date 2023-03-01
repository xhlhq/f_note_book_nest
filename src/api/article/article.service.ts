/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 10:02:18
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-03-01 20:18:33
 * @Description: 
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleContent } from './entities/article.entity';
import { User } from '../user/entities/user.entity';
import { Classify } from '../classify/entities/classify.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
import { ListArticleDto } from './dto/list-article.dto';


@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly article: Repository<Article>,
    @InjectRepository(ArticleContent) private readonly articleContent: Repository<ArticleContent>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Classify) private readonly classify: Repository<Classify>,
    @InjectRepository(Keyword) private readonly keyword: Repository<Keyword>) { }

  async create(createArticleDto: CreateArticleDto, user: User) {
    // 获取文章分类
    const classify = await this.classify.findOne({
      where: {
        id: createArticleDto.classifyId,
        del: 0
      }
    })
    if (!classify) throw new HttpException('不存在该文章分类', HttpStatus.BAD_REQUEST);

    // 设置文章关键字
    const keywords = !!createArticleDto.keywordIds ? createArticleDto.keywordIds.split(',') : [];
    const keywordsObj = [];
    if (keywords.length != 0) {
      for (let i = 0; i < keywords.length; ++i) {
        const keyword = await this.keyword.findOne({
          where: {
            name: keywords[i],
            del: 0
          }
        })
        if (keyword) {
          keywordsObj.push(keyword);
        } else {
          const newKeyword = new Keyword();
          newKeyword.name = keywords[i];
          const newKeyWordObj = await this.keyword.save(newKeyword);
          keywordsObj.push(newKeyWordObj);
        }
      }
    }

    // 创建文章内容
    const articleContent = new ArticleContent()
    articleContent.content = createArticleDto.content
    await this.articleContent.save(articleContent)

    // 创建文章
    const article = new Article()
    article.title = createArticleDto.title
    article.subTitle = createArticleDto.subTitle
    article.description = createArticleDto.description
    article.resource = createArticleDto.resource
    article.cover = createArticleDto.cover
    article.content = articleContent
    article.classify = classify
    article.keywords = keywordsObj
    article.author = user
    const result = await this.article.save(article)

    return result;
  }

  async findAll(query: ListArticleDto, user: User) {
    // const test = await this.article.createQueryBuilder("article").where("article.author", { author: user.id }).orderBy("sort", "DESC").skip(0).take(10).getMany();
    const { pageNum = 1, pageSize = 10, classifyId, keywordId, title, subTitle, description, resource, content } = query;
    const skip = (pageNum - 1) * pageSize;
    // const total = await this.article.createQueryBuilder('article')
    //   .where("article.author = :author", { author: user.id })
    //   .andWhere('article.classify = :classify', { classify: classifyId })
    //   .getCount();
    const where = {
      author: {
        id: user.id
      },
      classify: {
        id: classifyId
      },
      keywords: {
        id: keywordId
      },
      title: !!title ? Like(`%${title}%`) : null,
      subTitle: !!subTitle ? Like(`%${subTitle}%`) : null,
      description: !!description ? Like(`%${description}%`) : null,
      resource: !!resource ? Like(`%${resource}%`) : null,
      content: {
        content: !!content ? Like(`%${content}%`) : null,
      },
      del: 0
    }
    const total = (await this.article.find({ where })).length;
    const list = await this.article.find({
      where: where,
      relations: ['author', 'content', 'classify', 'keywords'],
      order: {
        sort: 'DESC'
      },
      skip: skip,
      take: pageSize
    })
    return {
      total,
      pageNum,
      pageSize,
      list: list
    };
  }

  async findOne(id: number) {
    const article = await this.article.findOne({
      where: {
        id: id,
        del: 0
      },
      relations: ['author', 'content', 'classify', 'keywords'],
    })
    if (!article) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST);
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const { title, subTitle, description, resource, cover, content, classifyId, keywordIds } = updateArticleDto;
    const article = await this.article.findOne({
      where: {
        id: id,
        del: 0
      },
      relations: ['author', 'content', 'classify', 'keywords'],
    })
    if (!article) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST);
    // 修改普通属性
    title && (article.title = title);
    subTitle && (article.subTitle = subTitle);
    description && (article.description = description);
    resource && (article.resource = resource);
    cover && (article.cover = cover);
    // await this.article.update(id, {
    //   title: title,
    //   subTitle: subTitle,
    //   description: description,
    //   resource: resource,
    //   cover: cover,
    // });

    // const article = await this.article.createQueryBuilder('article').leftJoinAndSelect('article.content', 'content').update(Article).set({
    //   title: updateArticleDto.title,
    //   subTitle: updateArticleDto.subTitle,
    //   description: updateArticleDto.description,
    //   resource: updateArticleDto.resource,
    //   cover: updateArticleDto.cover,
    // }).where("id = :id", { id: id }).execute();

    // 修改文章内容
    if (content) {
      article.content.content = content;
      await this.articleContent.save(article.content);
    }
    // 修改文章分类
    if (classifyId) {
      const classify = await this.classify.findOne({
        where: {
          id: classifyId,
          del: 0
        }
      })
      if (!classify) throw new HttpException('不存在该文章分类', HttpStatus.BAD_REQUEST);
      article.classify = classify;
    }
    // 修改关键字
    if (keywordIds) {
      const keywords = keywordIds.split(',');
      const keywordsObj = [];
      if (keywords.length != 0) {
        for (let i = 0; i < keywords.length; ++i) {
          const keyword = await this.keyword.findOne({
            where: {
              name: keywords[i],
              del: 0
            }
          })
          if (keyword) {
            keywordsObj.push(keyword);
          } else {
            const newKeyword = new Keyword();
            newKeyword.name = keywords[i];
            const newKeyWordObj = await this.keyword.save(newKeyword);
            keywordsObj.push(newKeyWordObj);
          }
        }
      }
      article.keywords = keywordsObj;
    }
    // 保存修改
    await this.article.save(article);
    return article;
  }

  async remove(id: number) {
    const article = await this.article.findOne({
      where: {
        id: id,
        del: 0
      }
    });
    if (!article) throw new HttpException('不存在该文章', HttpStatus.BAD_REQUEST);
    await this.article.update(id, { del: 1 })
    return {
      message: "删除成功"
    };
  }
}
