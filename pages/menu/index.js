import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { getMenu, updateMenu } from '../../api/menu';
import { getAllFoods } from '../../api/food';

Page({
  data: {
    menuData: null,
    foods: [],
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
    this.refreshData();
  },
  onLoad() {
    this.refreshData();
  },

  refreshData() {
    Promise.all([getMenu(), getAllFoods()]).then(([menuData, allFoods]) => {
      this.setData({ menuData });
      console.log(menuData);
      const getFoodsList = (foodIds) => {
        return foodIds.map((foodId) => allFoods.find((food) => food.id === foodId));
      };
      this.setData({ foods: getFoodsList(menuData.foodIds) });
      this.updateAmountAndNum(false);
    });
  },

  // 动态计算商品总价值 menuData.amount[i] * menuData.food[i].price
  updateAmountAndNum(update = true) {
    let totalPrice = 0;
    let totalAmount = 0;
    console.log(this.data.menuData);
    console.log(this.data.foods);
    for (let i = 0; i < this.data.menuData.foodIds.length; i++) {
      totalPrice += this.data.menuData.amounts[i] * parseInt(this.data.foods[i].price);
      totalAmount += this.data.menuData.amounts[i];
    }
    this.data.menuData.totalAmount = totalAmount;
    this.data.menuData.totalPrice = totalPrice;
    if (update) {
      updateMenu(this.data.menuData);
    }
    this.setData({ menuData: this.data.menuData });
  },




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
  onQuantityChange(e) {
    const {
      food: { id },
      quantity,
    } = e.detail;
    this.changeQuantityService({ id, quantity }).then(() => this.updateAmountAndNum());
  },
  goFoodDetail(e) {
    console.log(e.detail);

    const { id } = e.detail.food;
    wx.navigateTo({
      url: `/pages/foods/details/index?id=${id}`,
    });
  },
  onFoodDelete(e) {
    const {
      food: { id },
    } = e.detail;
    Dialog.confirm({
      content: '确认删除该商品吗?',
      confirmBtn: '确定',
      cancelBtn: '取消',
    })
      .then(() => {
        this.deleteFoodService(id).then(() => {
          Toast({ context: this, selector: '#t-toast', message: '商品删除成功' });
        });
      })
      .then(() => this.updateAmountAndNum());
  },

  onToSettle() {
    //TODO 结算
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
