// import Toast from 'tdesign-miniprogram/toast/index';
import { genFoodById } from '../../../../model/food';

// const shortageImg =
//   'https://cdn-we-retail.ym.tencent.com/miniapp/cart/shortage.png';

Component({
  isSpecsTap: false, // 标记本次点击事件是否因为点击specs触发（由于底层goods-card组件没有catch specs点击事件，只能在此处加状态来避免点击specs时触发跳转商品详情）
  externalClasses: ['wr-class'],
  properties: {
    menuData: {
      type: Object,
      observer(menuData) {
        // 用menuData 来生成foods
        this.setData({
          foods: menuData.foodIds.map((id, idx) => {
            const food = genFoodById(id);
            return { ...food, amount: menuData.amounts[idx] };
          }),
        });
      },
    },
    thumbWidth: { type: null },
    thumbHeight: { type: null },
  },

  data: {
    // shortageImg,
    // isShowSpecs: false,
    // currentGoods: {},
    // isShowToggle: false,
    foods: [],
    _storeGoods: [],
    _invalidGoodItems: [],
  },

  methods: {
    // 删除商品
    deleteFood(e) {
      const { food } = e.currentTarget.dataset;
      this.triggerEvent('delete', { food });
    },

    // 清空失效商品
    // clearInvalidGoods() {
    //   this.triggerEvent('clearinvalidgoods');
    // },

    // 选中商品
    selectGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('selectgoods', {
        goods,
        isSelected: !goods.isSelected,
      });
    },

    changeQuantity(num, food) {
      this.triggerEvent('changequantity', {
        food,
        quantity: num,
      });
    },
    changeStepper(e) {
      const { value } = e.detail;
      const { food } = e.currentTarget.dataset;
      let num = value;
      if (value > 10) {
        num = 10;
      }
      this.changeQuantity(num, food);
    },

    input(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      const num = value;
      this.changeQuantity(num, goods);
    },

    // overlimit(e) {
    //   const text =
    //     e.detail.type === 'minus'
    //       ? '该商品数量不能减少了哦'
    //       : '同一商品最多购买999件';
    //   Toast({
    //     context: this,
    //     selector: '#t-toast',
    //     message: text,
    //   });
    // },

    // 去凑单/再逛逛
    // gotoBuyMore(e) {
    //   const { promotion, storeId = '' } = e.currentTarget.dataset;
    //   this.triggerEvent('gocollect', { promotion, storeId });
    // },

    // 选中门店
    // selectStore(e) {
    //   const { storeIndex } = e.currentTarget.dataset;
    //   const store = this.data.storeGoods[storeIndex];
    //   const isSelected = !store.isSelected;
    //   if (store.storeStockShortage && isSelected) {
    //     Toast({
    //       context: this,
    //       selector: '#t-toast',
    //       message: '部分商品库存不足',
    //     });
    //     return;
    //   }
    //   this.triggerEvent('selectstore', {
    //     store,
    //     isSelected,
    //   });
    // },

    // 展开/收起切换
    // showToggle() {
    //   this.setData({
    //     isShowToggle: !this.data.isShowToggle,
    //   });
    // },

    // 展示规格popup
    // specsTap(e) {
    //   this.isSpecsTap = true;
    //   const { goods } = e.currentTarget.dataset;
    //   this.setData({
    //     isShowSpecs: true,
    //     currentGoods: goods,
    //   });
    // },

    // hideSpecsPopup() {
    //   this.setData({
    //     isShowSpecs: false,
    //   });
    // },

    goFoodDetail(e) {
      // if (this.isSpecsTap) {
      //   this.isSpecsTap = false;
      //   return;
      // }
      const { food } = e.currentTarget.dataset;
      this.triggerEvent('foodclick', { food });
    },

    gotoCoupons() {
      wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
    },
  },
});
