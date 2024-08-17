import { fetchCategoryList } from '../../../services/food/fetchCategoryList';

Page({
  data: {
    list: [],
  },
  async init() {
    try {
      const result = await fetchCategoryList();
      // console.log(result);
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(event) {
    const { item } = event.detail;
    wx.navigateTo({
      url: `/pages/foods/list/index?groupId=${item.groupId}`,
    });
  },
  onLoad() {
    this.init(true);
  },
});
