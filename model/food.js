import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;
const localImgPreifix = '../../../static/image/food';
const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

const allFoods = [
  {
    id: '1',
    groupId: '1000111', //属于哪个分类
    saasId: '88888888',
    title: '葱爆羊肉',
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09b.png',
    ],
    video: null,
    available: 1,
    price: '6800', //一分为单位
  },
];

/**
 * @param {string} groupId
 * @param {number} [length] 长度, 默认10
 */
export function genFood(groupId, length) {
  // eslint-disable-next-line no-console
  // console.log('genFood', groupId, length);
  return allFoods
    .filter((food) => food.groupId === groupId)
    .sort(() => Math.random() - 0.5)
    .slice(0, length);
}

/**
 * @param {string} id
 * */

export function genFoodById(id) {
  return allFoods.find((food) => food.id === id);
}
