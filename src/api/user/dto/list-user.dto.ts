export class ListUserDto {
  pageNum: number

  pageSize: number

  /**
 * 简介（模糊）
 */
  brief: string;
  /**
   * 邮箱（模糊）
   */
  email: string;
  /**
   * 性别
   */
  gender: string;
  /**
   * 昵称（模糊）
   */
  nickname: string;
  /**
   * 手机号（模糊）
   */
  phone: string;
  /**
   * 用户名（模糊）
   */
  username: string;

}