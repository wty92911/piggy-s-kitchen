Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isAllSelected: {
      type: Boolean,
      value: false,
    },
    totalPrice: {
      type: Number,
      value: 1,
    },
    totalFoodsNum: {
      type: Number,
      value: 0,
    },
    bottomHeight: {
      type: Number,
      value: 100,
    },
    fixed: Boolean,
  },
  data: {
    isDisabled: false,
  },

  methods: {
    handleSelectAll() {
      const { isAllSelected } = this.data;
      this.setData({
        isAllSelected: !isAllSelected,
      });
      this.triggerEvent('handleSelectAll', {
        isAllSelected: isAllSelected,
      });
    },

    handleToSettle() {
      if (this.data.isDisabled) return;
      this.triggerEvent('handleToSettle');
    },
  },
});
