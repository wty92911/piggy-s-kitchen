Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: { multipleSlots: true },

  properties: {
    soldout: {
      // 商品是否下架
      type: Boolean,
      value: false,
    },
    jumpArray: {
      type: Array,
      value: [],
    },
    isStock: {
      type: Boolean,
      value: true,
    }, // 是否有库存
    isSlotButton: {
      type: Boolean,
      value: false,
    }, // 是否开启按钮插槽
    shopCartNum: {
      type: Number, // 购物车气泡数量
    },
    buttonType: {
      type: Number,
      value: 0,
    },
    minDiscountPrice: {
      type: String,
      value: '',
    },
    minSalePrice: {
      type: String,
      value: '',
    },
  },

  data: {
    showBubble: false,
    fillPrice: false,
  },

  methods: {
    // toAddCart() {
    //   const { isStock } = this.properties;
    //   if (!isStock) return;
    //   this.triggerEvent('toAddCart');
    // },
    // 立即下单
    toBuyNow(e) {
      this.setData({ showBubble: true });
      setTimeout(() => {
        this.setData({ showBubble: false });
      }, 1000); // 1秒后隐藏泡泡
      this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
      const { url } = e.currentTarget.dataset;
      return this.triggerEvent('toNav', {
        e,
        url,
      });
    },
  },
});
