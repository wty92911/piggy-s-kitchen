import { config } from '../../config/index';

/** 获取购物车mock数据 */
function mockFetchMenuData(params) {
  const { delay } = require('../_utils/delay');
  const { genMenuData } = require('../../model/menu');

  return delay().then(() => genMenuData(params));
}

/** 获取购物车数据 */
export function fetchMenuData(params) {
  if (config.useMock) {
    return mockFetchMenuData(params);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}
