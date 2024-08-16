import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { fetchCartGroupData } from '../../services/cart/cart';
import { fetchMenuData } from '../../services/menu/menu';
import { genFoodById, genFoodByIds } from '../../model/food';

Page({
  data: {
    menuData: null,
    foods: [],
    totalAmount: 0,
    totalFoodsNum: 0,
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.refreshData();
  },

  refreshData() {
    this.getMenuData().then((res) => {
      const menuData = res.data;
      this.setData({ menuData });
      this.setData({ foods: genFoodByIds(menuData.foodIds) });
      this.updateAmountAndNum();
    });
  },
  // 动态计算商品总价值 menuData.amount[i] * menuData.food[i].price
  updateAmountAndNum() {
    let totalPrice = 0;
    let totalFoodsNum = 0;
    console.log(this.data.menuData);
    console.log(this.data.foods);
    for (let i = 0; i < this.data.menuData.foodIds.length; i++) {
      totalPrice += this.data.menuData.amounts[i] * parseInt(this.data.foods[i].price);
      totalFoodsNum += this.data.menuData.amounts[i];
    }
    console.log(totalPrice);
    this.setData({ totalPrice: totalPrice, totalFoodsNum: totalFoodsNum });
  },

  findGoods(spuId, skuId) {
    let currentStore;
    let currentActivity;
    let currentGoods;
    const { storeGoods } = this.data.cartGroupData;
    for (const store of storeGoods) {
      for (const activity of store.promotionGoodsList) {
        for (const goods of activity.goodsPromotionList) {
          if (goods.spuId === spuId && goods.skuId === skuId) {
            currentStore = store;
            currentActivity = currentActivity;
            currentGoods = goods;
            return {
              currentStore,
              currentActivity,
              currentGoods,
            };
          }
        }
      }
    }
    return {
      currentStore,
      currentActivity,
      currentGoods,
    };
  },

  // 注：实际场景时应该调用接口获取购物车数据
  getCartGroupData() {
    const { cartGroupData } = this.data;
    if (!cartGroupData) {
      return fetchMenuData();
    }
    return Promise.resolve({ data: cartGroupData });
  },

  getMenuData() {
    const { menuData } = this.data;
    if (!menuData) {
      return fetchMenuData();
    }
    return Promise.resolve({ data: menuData });
  },
  // 选择单个商品
  // 注：实际场景时应该调用接口更改选中状态
  // selectGoodsService({ spuId, skuId, isSelected }) {
  //   this.findGoods(spuId, skuId).currentGoods.isSelected = isSelected;
  //   return Promise.resolve();
  // },

  // 全选门店
  // 注：实际场景时应该调用接口更改选中状态
  // selectStoreService({ storeId, isSelected }) {
  //   const currentStore = this.data.cartGroupData.storeGoods.find((s) => s.storeId === storeId);
  //   currentStore.isSelected = isSelected;
  //   currentStore.promotionGoodsList.forEach((activity) => {
  //     activity.goodsPromotionList.forEach((goods) => {
  //       goods.isSelected = isSelected;
  //     });
  //   });
  //   return Promise.resolve();
  // },

  // 加购数量变更
  // 注：实际场景时应该调用接口
  changeQuantityService({ id, quantity }) {
    // 遍历menuData.foodIds 找到对应id的index，修改menuData.amounts[index]=quantity;
    for (let i = 0; i < this.data.menuData.foodIds.length; i++) {
      if (this.data.menuData.foodIds[i] === id) {
        this.data.menuData.amounts[i] = quantity;
      }
    }
    // console.log(this.data.menuData);
    return Promise.resolve();
  },

  // 删除加购商品
  // 注：实际场景时应该调用接口
  deleteFoodService(id) {
    for (let i = 0; i < this.data.menuData.foodIds.length; i++) {
      if (this.data.menuData.foodIds[i] === id) {
        this.data.menuData.foodIds.splice(i, 1);
        this.data.menuData.amounts.splice(i, 1);
      }
    }
    return Promise.resolve();
  },

  // 清空失效商品
  // 注：实际场景时应该调用接口
  clearInvalidGoodsService() {
    this.data.cartGroupData.invalidGoodItems = [];
    return Promise.resolve();
  },

  onGoodsSelect(e) {
    const {
      goods: { spuId, skuId },
      isSelected,
    } = e.detail;
    const { currentGoods } = this.findGoods(spuId, skuId);
    Toast({
      context: this,
      selector: '#t-toast',
      message: `${isSelected ? '选择' : '取消'}"${
        currentGoods.title.length > 5 ? `${currentGoods.title.slice(0, 5)}...` : currentGoods.title
      }"`,
      icon: '',
    });
    this.selectGoodsService({ spuId, skuId, isSelected }).then(() => this.refreshData());
  },

  onStoreSelect(e) {
    const {
      store: { storeId },
      isSelected,
    } = e.detail;
    this.selectStoreService({ storeId, isSelected }).then(() => this.refreshData());
  },

  onQuantityChange(e) {

    const {
      food: { id },
      quantity,
    } = e.detail;
    this.changeQuantityService({ id, quantity }).then(() => this.refreshData());
  },

  goCollect() {
    /** 活动肯定有一个活动ID，用来获取活动banner，活动商品列表等 */
    const promotionID = '123';
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },

  goFoodDetail(e) {
    const { id } = e.detail.food;
    wx.navigateTo({
      url: `/pages/food/details/index?id=${id}`,
    });
  },

  clearInvalidGoods() {
    // 实际场景时应该调用接口清空失效商品
    this.clearInvalidGoodsService().then(() => this.refreshData());
  },

  onFoodDelete(e) {
    const {
      food: { id },
    } = e.detail;
    Dialog.confirm({
      content: '确认删除该商品吗?',
      confirmBtn: '确定',
      cancelBtn: '取消',
    }).then(() => {
      this.deleteFoodService(id).then(() => {
        Toast({ context: this, selector: '#t-toast', message: '商品删除成功' });
        this.refreshData();
      });
    });
  },

  // onSelectAll(event) {
  //   const { isAllSelected } = event?.detail ?? {};
  //   Toast({
  //     context: this,
  //     selector: '#t-toast',
  //     message: `${isAllSelected ? '取消' : '点击'}了全选按钮`,
  //   });
  //   // 调用接口改变全选
  // },

  onToSettle() {
    const goodsRequestList = [];
    this.data.cartGroupData.storeGoods.forEach((store) => {
      store.promotionGoodsList.forEach((promotion) => {
        promotion.goodsPromotionList.forEach((m) => {
          if (m.isSelected == 1) {
            goodsRequestList.push(m);
          }
        });
      });
    });
    wx.setStorageSync('order.goodsRequestList', JSON.stringify(goodsRequestList));
    wx.navigateTo({ url: '/pages/order/order-confirm/index?type=cart' });
  },
  onGotoHome() {
    wx.switchTab({ url: '/pages/home/home' });
  },
});
