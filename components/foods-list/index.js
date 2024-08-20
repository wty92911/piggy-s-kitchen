Component({
  externalClasses: ['wr-class'],

  properties: {
    foodsList: {
      type: Array,
      value: [],
    },
    id: {
      type: String,
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    thresholds: {
      type: Array,
      value: [],
    },
  },

  data: {
    independentID: '',
  },

  lifetimes: {
    ready() {
      this.init();

      // console.log(this.foodsList);
    },
  },

  methods: {
    onClickFoods(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('click', { ...e.detail, index });
    },
    onAddCart(e) {
      this.triggerEvent('addcart', { ...e.detail });
    },
    onDeleteFood(e) {
      const { food } = e.currentTarget.dataset;
      this.triggerEvent('delete', { food });
    },
    onClickFoodsThumb(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('thumb', { ...e.detail, index });
    },

    init() {
      this.genIndependentID(this.id || '');
    },

    genIndependentID(id) {
      if (id) {
        this.setData({ independentID: id });
      } else {
        this.setData({
          independentID: `foods-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});
