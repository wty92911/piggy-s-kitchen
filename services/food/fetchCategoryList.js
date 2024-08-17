/** 获取商品列表 */
import { categoryCloudPath } from '../../config/index';
import { getCategory } from '../../api/category';

function addCloudPathPrefix(categoryList) {
  return categoryList.map((item) => {
    if (item.thumbnail) {
      // eslint-disable-next-line no-param-reassign
      item.thumbnail = `${categoryCloudPath}${item.thumbnail}`;
    }
    if (item.children && item.children.length > 0) {
      // eslint-disable-next-line no-param-reassign
      item.children = addCloudPathPrefix(item.children);
    }
    return item;
  });
}

export function fetchCategoryList() {
  return getCategory()
    .then((category) => {
      return addCloudPathPrefix(category);
    })
    .catch((error) => {
      console.error('Error fetching category list:', error);
    });
}