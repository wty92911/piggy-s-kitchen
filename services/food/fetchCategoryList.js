import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchFoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/food-category');
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export function getCategoryList() {
  if (config.useMock) {
    return mockFetchFoodCategory();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
