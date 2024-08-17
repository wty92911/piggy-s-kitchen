import { menuDocId, collectionName } from '../config/index';

export async function getMenu() {
  const db = wx.cloud.database();
  return db
    .collection(collectionName)
    .doc(menuDocId)
    .get()
    .then((res) => res.data.menu);
}

export async function updateMenu(newMenu) {
  console.log(newMenu);
  const db = wx.cloud.database();
  return db
    .collection(collectionName)
    .doc(menuDocId)
    .update({
      data: {
        menu: newMenu,
      },
    })
    .then((res) => {
      if (res.stats.updated === 1) {
        // return 'Menu updated successfully';
        console.log(res);
      } else {
        console.log(res);
        console.log('Menu update failed');
      }
    })
    .catch((err) => {
      console.error('Menu update failed: ', err);
      // throw new Error(`Menu update failed: ${err.message}`);
    });
}