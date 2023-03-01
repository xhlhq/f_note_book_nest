import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { ListClassifyDto } from './dto/list-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';
import { Classify } from './entities/classify.entity';

@Injectable()
export class ClassifyService {
  constructor(@InjectRepository(Classify) private readonly classify: Repository<Classify>) { }
  async create(createClassifyDto: CreateClassifyDto) {
    const { name, value, type, status } = createClassifyDto;
    const classify = await this.classify.findOne({
      where: [{
        name: name,
        del: 0
      }, {
        value: value,
        del: 0
      }]
    })
    if (classify !== null) {
      throw new HttpException('已经有该类型了', HttpStatus.NOT_FOUND);
    }
    const data = new Classify();
    data.name = name;
    data.value = value;
    data.type = type;
    data.status = status;

    await this.classify.save(data);
    return data;
  }

  async findAll(query: ListClassifyDto) {
    const { pageNum = 1, pageSize = 10, name, value, type, status } = query;

    const skip = (pageNum - 1) * pageSize;
    const where = {
      name: !!name ? Like(`%${name}%`) : null,
      value: !!value ? Like(`%${value}%`) : null,
      type: !!type ? Like(`%${type}%`) : null,
      status: !!status ? status : null,
      del: 0
    }
    const total = (await this.classify.find({ where })).length;
    const list = await this.classify.find({
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
    const data = await this.classify.findOne({
      where: {
        id,
        del: 0
      }
    });
    if (!data) throw new HttpException('未找该类型', HttpStatus.NOT_FOUND);
    return data;
  }

  async update(id: number, updateClassifyDto: UpdateClassifyDto) {
    const { name, value, type, status } = updateClassifyDto;
    const data = await this.classify.findOne({
      where: [
        {
          id,
          del: 0,
        }
      ]
    })
    if (!data) throw new HttpException('未找到该类型', HttpStatus.NOT_FOUND);
    if (name || value) {
      const classify = await this.classify.findOne({
        where: [{
          name: name,
          del: 0
        }, {
          value: value,
          del: 0
        }]
      })
      if (classify !== null) {
        throw new HttpException('已经有该类型了', HttpStatus.NOT_FOUND);
      }
    }
    // 修改类型信息
    name && (data.name = name);
    value && (data.value = value);
    type && (data.type = type);
    status && (data.status = status);

    this.classify.save(data);
    return data;
  }

  async remove(id: number) {
    const data = await this.classify.findOne({
      where: {
        id,
        del: 0,
      }
    })
    if (!data) throw new HttpException('未找到该类型', HttpStatus.NOT_FOUND);
    await this.classify.update(id, { del: 1 })
    return {
      message: '删除成功'
    };
  }
}
