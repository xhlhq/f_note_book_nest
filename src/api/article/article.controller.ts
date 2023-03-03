import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/auth/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ListArticleDto } from './dto/list-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createArticleDto: CreateArticleDto, @CurrentUser() user: User) {
    return this.articleService.create(createArticleDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() query: ListArticleDto, @CurrentUser() user: User) {
    return this.articleService.findAll(query, user);
  }

  @Get('/pc')
  findAllPC(@Query() query: ListArticleDto) {
    return this.articleService.findAllPC(query);
  }
  @Get('/pc/:id')
  findOnePc(@Param('id') id: string) {
    return this.articleService.findOnePC(+id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
