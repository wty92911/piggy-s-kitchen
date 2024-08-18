import { fetchFoodsList } from '../../../services/food/fetchFoodsList';
import Toast from 'tdesign-miniprogram/toast';
import { getMenu } from '../../../api/menu';
import { addFoodToMenu } from '../../../services/menu/menu';

const initFilters = {
  overall: 1,
  sorts: '',
  layout: 0,
};

Page({
  data: {
    menu: null,
    foodsList: [],
    layout: 0,
    sorts: '',
    overall: 1,
    show: false,
    minVal: '',
    maxVal: '',
    filter: initFilters,
    hasLoaded: false,
    loadMoreStatus: 0,
    loading: true,
    groupId: 0,
    showAddFoodPopup: false,
  },

  pageNum: 1,
  pageSize: 30,
  total: 0,

  onShow() {
    // this.init(true);
    getMenu().then((menu) => {
      this.setData({ menu });
      console.log(menu);
    });
  },
  handleFilterChange(e) {
    const { layout, overall, sorts } = e.detail;
    this.pageNum = 1;
    this.setData({
      layout,
      sorts,
      overall,
      loadMoreStatus: 0,
    });
    this.init(true);
  },
  handleAddFoodClick() {
    this.setData({ showAddFoodPopup: true });
  },
  handleAddFoodSuccess(e) {
    console.log(e);
    this.setData({ showAddFoodPopup: false });
    this.init(true);
  },
  gotoMenuPage() {
    wx.switchTab({
      url: '/pages/menu/index',
    });
  },
  generalQueryData(reset = false) {
    const { filter, keywords, minVal, maxVal, groupId } = this.data;
    const { pageNum, pageSize } = this;
    const { sorts, overall } = filter;
    const params = {
      sort: 0, // 0 综合，1 价格
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
      groupId: groupId,
    };

    if (sorts) {
      params.sort = 1;
      params.sortType = sorts === 'desc' ? 1 : 0;
    }

    if (overall) {
      params.sort = 0;
    } else {
      params.sort = 1;
    }
    params.minPrice = minVal ? minVal * 100 : 0;
    params.maxPrice = maxVal ? maxVal * 100 : undefined;
    if (reset) return params;
    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },

  async init(reset = true) {
    const { foodsList = [] } = this.data;
    const params = this.generalQueryData(reset);
    // if (loadMoreStatus !== 0) return;
    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      const revFoodsList = await fetchFoodsList(params);

      const code = 'Success';
      console.log(revFoodsList);
      if (code.toUpperCase() === 'SUCCESS') {
        if (revFoodsList.length === 0 && reset) {
          this.total = 0;
          this.setData({
            emptyInfo: {
              tip: '抱歉，未找到相关商品',
            },
            hasLoaded: true,
            loadMoreStatus: 0,
            loading: false,
            foodsList: [],
          });
          return;
        }

        const _foodsList = reset ? revFoodsList : foodsList.concat(revFoodsList);
        //TODO: 这里先全部返回
        const _loadMoreStatus = _foodsList.length === revFoodsList.length ? 2 : 0;
        this.pageNum = params.pageNum || 1;
        this.total = revFoodsList.length;
        this.setData({
          foodsList: _foodsList,
          loadMoreStatus: _loadMoreStatus,
        });
      } else {
        this.setData({
          loading: false,
        });
        wx.showToast({
          title: '查询失败，请稍候重试',
        });
      }
    } catch (error) {
      this.setData({
        loading: false,
      });
    }
    this.setData({
      hasLoaded: true,
      loading: false,
    });
  },

  onLoad(options) {
    const { groupId } = options;
    if (groupId) {
      this.setData({
        groupId,
      });
    }
    this.init(true);
  },

  onReachBottom() {
    const { foodsList } = this.data;
    const { total = 0 } = this;
    if (foodsList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }
    this.init(false);
  },

  handleAddCart(e) {
    const { id } = e.detail;
    addFoodToMenu(id)
      .then((menu) => {
        this.setData({
          menu,
        });
      })
      .then(() => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '已添加至菜单',
        });
      });
  },

  tagClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击标签',
    });
  },

  gotoFoodsDetail(e) {
    const { index } = e.detail;
    const { id } = this.data.foodsList[index];
    // console.log(id);
    wx.navigateTo({
      url: `/pages/foods/details/index?id=${id}`,
    });
  },

  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  onMinValAction(e) {
    const { value } = e.detail;
    this.setData({ minVal: value });
  },

  onMaxValAction(e) {
    const { value } = e.detail;
    this.setData({ maxVal: value });
  },

  reset() {
    this.setData({ minVal: '', maxVal: '' });
  },

  confirm() {
    const { minVal, maxVal } = this.data;
    let message = '';
    if (minVal && !maxVal) {
      message = `价格最小是${minVal}`;
    } else if (!minVal && maxVal) {
      message = `价格范围是0-${minVal}`;
    } else if (minVal && maxVal && minVal <= maxVal) {
      message = `价格范围${minVal}-${this.data.maxVal}`;
    } else {
      message = '请输入正确范围';
    }
    if (message) {
      Toast({
        context: this,
        selector: '#t-toast',
        message,
      });
    }
    this.pageNum = 1;
    this.setData(
      {
        show: false,
        minVal: '',
        foodsList: [],
        loadMoreStatus: 0,
        maxVal: '',
      },
      () => {
        this.init();
      },
    );
  },
});
