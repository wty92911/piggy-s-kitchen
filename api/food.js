import { allFoodsDocId, collectionName, cloudStoragePath } from '../config/index';

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

const foodFields = {
  id: 'str',
  desc: 'str',
  groupId: 'str',
  primaryImage: 'str',
  images: ['img'],
  price: 'str',
  title: 'str',
}
const foodImagePath = 'static/image/food';
export async function addFood(allFoods, food) {
  console.log(food);
  wx.cloud.uploadFile({
    cloudPath: `./${foodImagePath}/${food.title}.png`,
    filePath: food.primaryImage,
  });
  // eslint-disable-next-line no-param-reassign
  food.primaryImage = `${cloudStoragePath}/${foodImagePath}/${food.title}.png`;
  for (let i = 0; i < food.images.length; i++) {
    wx.cloud.uploadFile({
      cloudPath: `./${foodImagePath}/${food.title}-${i}.png`,
      filePath: food.images[i],
    });
    // eslint-disable-next-line no-param-reassign
    food.images[i] = `${cloudStoragePath}/${foodImagePath}/${food.title}-${i}.png`;
  }
  const db = wx.cloud.database();
  return db
    .collection(collectionName)
    .doc(allFoodsDocId)
    .update({
      data: {
        allFoods: [...allFoods, food],
      },
    });
}

export async function deleteFood(allFoods, food) {
  for (let i = 0; i < food.images.length; i++) {
    wx.cloud.deleteFile({
      fileList: [food.images[i]],
    });
  }
  wx.cloud.deleteFile({
    fileList: [food.primaryImage],
  });
  const db = wx.cloud.database();
  return db
    .collection(collectionName)
    .doc(allFoodsDocId)
    .update({
      data: {
        allFoods: allFoods.filter((item) => item.id !== food.id),
      },
    });
}