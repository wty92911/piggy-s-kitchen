Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    id: {
      type: String,
      value: '',
      observer(id) {
        this.genIndependentID(id);
        if (this.properties.thresholds?.length) {
          this.createIntersectionObserverHandle();
        }
      },
    },
    data: {
      type: Object,
      observer(data) {
        if (!data) {
          return;
        }
        let isValidityLinePrice = true;
        if (data.originPrice && data.price && data.originPrice < data.price) {
          isValidityLinePrice = false;
        }
        console.log(data);
        this.setData({ foods: data, isValidityLinePrice });
      },
    },
    currency: {
      type: String,
      value: '¥',
    },

    thresholds: {
      type: Array,
      value: [],
      observer(thresholds) {
        if (thresholds && thresholds.length) {
          this.createIntersectionObserverHandle();
        } else {
          this.clearIntersectionObserverHandle();
        }
      },
    },
  },

  data: {
    showAnimation: false,
    animationData: {},
    cartPosition: { x: 0, y: 0 }, // 购物车的位置
    independentID: '',
    foods: { id: '' },
    isValidityLinePrice: false,
  },

  lifetimes: {
    ready() {
      this.init();

    },
    detached() {
      this.clear();
    },
  },

  pageLifeTimes: {},

  methods: {
    clickHandle() {
      this.triggerEvent('click', { foods: this.data.foods });
    },

    clickThumbHandle() {
      this.triggerEvent('thumb', { foods: this.data.foods });
    },

    addCartHandle(e) {
      const { id } = e.currentTarget.dataset;
      this.triggerEvent('add-cart', {
        id,
      });
      // console.log(`#food-${id}`);
      //
      // wx.createSelectorQuery()
      //   .in(this)
      //   .select(`#food-${id}`)
      //   .boundingClientRect((rect) => {
      //     console.error('Failed to get click position');
      //
      //     if (rect) {
      //       this.setData({
      //         showAnimation: true,
      //         startX: rect.left,
      //         startY: rect.top
      //       });
      //       // 设置 CSS 变量
      //       const animateIcon = this.selectComponent('.animate-icon');
      //       animateIcon.setData({
      //         style: `--startX: ${rect.left}px; --startY: ${rect.top}px;`,
      //       });
      //       // 隐藏动画节点
      //       // setTimeout(() => {
      //       //   this.setData({ showAnimation: false });
      //       // }, 1000);
      //     } else {
      //       console.error('Failed to get click position');
      //     }
      //   })
      //   .exec();
    },
    genIndependentID(id) {
      let independentID;
      if (id) {
        independentID = id;
      } else {
        independentID = `foods-card-${~~(Math.random() * 10 ** 8)}`;
      }
      this.setData({ independentID });
    },

    init() {
      const { thresholds, id } = this.properties;
      this.genIndependentID(id);
      if (thresholds && thresholds.length) {
        this.createIntersectionObserverHandle();
      }
    },

    clear() {
      this.clearIntersectionObserverHandle();
    },

    intersectionObserverContext: null,

    createIntersectionObserverHandle() {
      if (this.intersectionObserverContext || !this.data.independentID) {
        return;
      }
      this.intersectionObserverContext = this.createIntersectionObserver({
        thresholds: this.properties.thresholds,
      }).relativeToViewport();

      this.intersectionObserverContext.observe(
        `#${this.data.independentID}`,
        (res) => { this.intersectionObserverCB(res); });
    },

    intersectionObserverCB() {
      this.triggerEvent('ob', {
        foods: this.data.foods,
        context: this.intersectionObserverContext,
      });
    },

    clearIntersectionObserverHandle() {
      if (this.intersectionObserverContext) {
        try {
          this.intersectionObserverContext.disconnect();
        } catch (e) { }
        this.intersectionObserverContext = null;
      }
    },
  },
});
