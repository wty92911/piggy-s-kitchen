import { getAllFoods } from '../api/food';

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

export async function genFood(groupId, length) {
  try {
    // 获取所有食物
    const foods = await getAllFoods();
    // 筛选出符合条件的食物
    const filteredFoods = foods.filter((food) => food.groupId === groupId);

    // 随机打乱数组顺序并截取指定长度
    return filteredFoods.sort(() => Math.random() - 0.5).slice(0, length);
  } catch (err) {
    console.error('Failed to generate food:', err);
    throw err;
  }
}

/**
 * @param {string} id
 * return {object} food
 * */

export function genFoodById(id) {
  return allFoods.find((food) => food.id === id);
}

/**
 *
 * @param {Array} ids
 */

export function genFoodByIds(ids) {
  // return results[i].id == ids[i]
  const results = [];
  for (let i = 0; i < ids.length; i++) {
    results.push(genFoodById(ids[i]));
  }
  return results;
}
