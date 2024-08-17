import { categoryDocId, collectionName } from '../config/index';


async function getCategory() {
  const db = wx.cloud.database();
  return db
    .collection(collectionName)
    .doc(categoryDocId)
    .get()
    .then((res) => res.data.category);
}

export { getCategory };
