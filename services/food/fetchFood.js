import { getOneFood } from '../../api/food';


/** 获取商品列表 */
export function fetchFood(id = 0) {
  return getOneFood(id);
}
