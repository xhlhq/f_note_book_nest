import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { ListKeywordDto } from './dto/list-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword } from './entities/keyword.entity';

@Injectable()
export class KeywordService {
  constructor(@InjectRepository(Keyword) private readonly keyword: Repository<Keyword>) { }
  async create(createKeywordDto: CreateKeywordDto) {
    const { name, status } = createKeywordDto;

    const classify = await this.keyword.findOne({
      where: {
        name: name,
        del: 0
      }
    })
    if (classify !== null) {
      throw new HttpException('已经有该标签了', HttpStatus.NOT_FOUND);
    }
    const data = new Keyword();
    data.name = name;
    data.status = status;

    await this.keyword.save(data);
    return data;
  }

  async findAll(query: ListKeywordDto) {
    const { pageNum = 1, pageSize = 10, name, status } = query;

    const skip = (pageNum - 1) * pageSize;
    const where = {
      name: !!name ? Like(`%${name}%`) : null,
      status: !!status ? status : null,
      del: 0
    }
    const total = (await this.keyword.find({ where })).length;
    const list = await this.keyword.find({
      where,
      order: {
        sort: 'DESC'
      },
      skip: skip,
      take: pageSize,
    })
    return {
      total,
      pageNum,
      pageSize,
      list
    };
  }

  async findOne(id: number) {
    const data = await this.keyword.findOne({
      where: {
        id,
        del: 0
      }
    });
    if (!data) throw new HttpException('未找该标签', HttpStatus.NOT_FOUND);
    return data;
  }

  async update(id: number, updateKeywordDto: UpdateKeywordDto) {
    const { name, status } = updateKeywordDto;
    const data = await this.keyword.findOne({
      where: [
        {
          id,
          del: 0,
        }
      ]
    })
    if (!data) throw new HttpException('未找到该标签', HttpStatus.NOT_FOUND);
    if (name) {
      const classify = await this.keyword.findOne({
        where: {
          name: name,
          del: 0
        }
      })
      if (classify !== null) {
        throw new HttpException('已经有该标签了', HttpStatus.BAD_REQUEST);
      }
    }
    // 修改标签信息
    name && (data.name = name);
    status && (data.status = status);

    this.keyword.save(data);
    return data;
  }

  async remove(id: number) {
    const data = await this.keyword.findOne({
      where: {
        id,
        del: 0,
      }
    })
    if (!data) throw new HttpException('未找该标签', HttpStatus.NOT_FOUND);
    await this.keyword.update(id, { del: 1 })
    return {
      message: '删除成功'
    };
  }
}
