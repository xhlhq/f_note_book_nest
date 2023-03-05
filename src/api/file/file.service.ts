import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { ListFileDto } from './dto/list-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { MyFile } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(@InjectRepository(MyFile) private readonly myFile: Repository<MyFile>) { }

  async uploadImg(file: Express.Multer.File, createFileDto: CreateFileDto) {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = file;
    const { type, subType, articleId } = createFileDto;

    const data = new MyFile();
    data.fieldname = fieldname;
    data.originalname = originalname;
    data.encoding = encoding;
    data.mimetype = mimetype;
    data.destination = destination;
    data.filename = filename;
    data.path = path;
    data.size = size;
    data.type = type || 'other';
    data.subType = subType || 'other';
    data.articleId = articleId || null;

    await this.myFile.save(data);

    return {
      code: 200,
      data,
      message: "上传成功"
    };
  }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async findAll(query: ListFileDto) {
    const { pageNum = 1, pageSize = 10, type = null, subType = null, articleId = null, fieldname = null, originalname = null, mimetype = null, filename = null } = query;
    const skip = (pageNum - 1) * pageSize;
    const where = {
      type: !!type ? Like(`%${type}%`) : null,
      subType: !!subType ? Like(`%${subType}%`) : null,
      originalname: !!originalname ? Like(`%${originalname}%`) : null,
      mimetype: !!mimetype ? Like(`%${mimetype}%`) : null,
      filename: !!filename ? Like(`%${filename}%`) : null,
      fieldname: !!fieldname ? fieldname : null,
      articleId: !!articleId ? articleId : null,
      del: 0
    }
    const total = (await this.myFile.find({ where })).length;
    const list = await this.myFile.find({
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

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
