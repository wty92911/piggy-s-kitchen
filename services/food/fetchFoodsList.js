/* eslint-disable no-param-reassign */
import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchFoodsList(params) {
  const { delay } = require('../_utils/delay');
  const { getFoodSearchResult } = require('../../model/search');

  const data = getFoodSearchResult(params);
  // console.log(data);
  if (data.foodsList.length) {
    data.foodsList.forEach((item) => {

      item.id = item.id;
      item.thumb = item.primaryImage;
      item.title = item.title;
      // item.price = item.minSalePrice;
      // item.originPrice = item.maxLinePrice;
      item.desc = '';
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取商品列表 */
export function fetchFoodsList(params) {
  if (config.useMock) {
    return mockFetchFoodsList(params);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
