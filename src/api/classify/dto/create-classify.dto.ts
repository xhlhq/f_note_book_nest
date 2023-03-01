import { IsNotEmpty } from "class-validator"
export class CreateClassifyDto {
  @IsNotEmpty({
    message: '类型名称不能为空'
  })
  name: string

  value: string

  type: string

  status: number
}
