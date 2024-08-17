import { allFoodsDocId, collectionName } from '../config/index';

export async function getAllFoods() {
  const db = wx.cloud.database();
  return db
    .collection(collectionName)
    .doc(allFoodsDocId)
    .get()
    .then((res) => res.data.allFoods);
}

export async function getOneFood(customId) {
  const allFoods = await getAllFoods();
  const food = allFoods.find((food) => food.id === customId);
  if (food) {
    return food;
  }
  throw new Error('Food not found');
}
