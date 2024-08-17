import { getAllFoods } from '../../api/food';


/** 获取商品列表 */
export function fetchFoodsList(params) {
  return getAllFoods()
    .then((data) => {
      let filteredData = [...data];
      // Keyword search
      if (params.keyword) {
        filteredData = filteredData.filter((food) => food.title.toLowerCase().includes(params.keyword.toLowerCase()));
      }
      // Group filtering
      if (params.groupId) {
        filteredData = filteredData.filter((food) => food.groupId === params.groupId);
      }
      // Price range filtering
      if (params.minPrice !== undefined) {
        filteredData = filteredData.filter((food) => food.price >= params.minPrice);
      }
      if (params.maxPrice !== undefined) {
        filteredData = filteredData.filter((food) => food.price <= params.maxPrice);
      }
      // Sorting
      if (params.sort === 1) {
        filteredData.sort((a, b) => {
          if (params.sortType === 1) {
            return b.price - a.price; // Descending
          } else {
            return a.price - b.price; // Ascending
          }
        });
      }
      // Pagination
      const start = (params.pageNum - 1) * params.pageSize;
      const end = start + params.pageSize;
      return filteredData.slice(start, end);
    })
    .catch((error) => {
      // 处理错误
      console.error('Error fetching food list:', error);
    });
}
