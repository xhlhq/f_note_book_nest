/*
 * @Author: xhlhq 2874864487@qq.com
 * @Date: 2023-02-24 10:02:18
 * @LastEditors: xhlhq 2874864487@qq.com
 * @LastEditTime: 2023-02-28 23:05:54
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, ArticleContent } from './entities/article.entity';
import { User } from '../user/entities/user.entity';
import { Classify } from '../classify/entities/classify.entity';
import { Keyword } from '../keyword/entities/keyword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleContent, User, Classify, Keyword])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
