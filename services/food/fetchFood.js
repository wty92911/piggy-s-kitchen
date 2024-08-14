import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchFood(ID = 0) {
  const { delay } = require('../_utils/delay');
  const { genFood } = require('../../model/food');
  return delay().then(() => genFood(ID));
}

/** 获取商品列表 */
export function fetchFood(ID = 0) {
  if (config.useMock) {
    return mockFetchFood(ID);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
