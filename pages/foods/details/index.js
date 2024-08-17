import Toast from 'tdesign-miniprogram/toast';
import { fetchFood } from '../../../services/food/fetchFood';

import { cdnBase } from '../../../config/index';
import { addFoodToMenu } from '../../../services/menu/menu';
import { getMenu } from '../../../api/menu';

const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;


Page({
  data: {
    // commentsList: [],
    // commentsStatistics: {
    //   badCount: 0,
    //   commentCount: 0,
    //   goodCount: 0,
    //   goodRate: 0,
    //   hasImageCount: 0,
    //   middleCount: 0,
    // },
    recLeftImg,
    recRightImg,
    food: {},
    details: {},

    jumpArray: [
      {
        title: '首页',
        url: '/pages/home/home',
        iconName: 'home',
      },
      {
        title: '菜单',
        url: '/pages/menu/index',
        iconName: 'menu',
        showCartNum: true,
      },
    ],
    totalAmount: 0,
    buttonType: 1,
    buyNum: 1,
    primaryImage: '',
    buyType: 0,
    price: 0,
    id: '',
    navigation: { type: 'fraction' },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    soldNum: 0, // 已售数量
  },

  buyItNow() {
    addFoodToMenu(this.data.details.id).then((menu) => {
      this.setData({
        totalAmount: menu.totalAmount,
      });
    });
    // this.showSkuSelectPopup(1);

  },


  toNav(e) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  showCurImg(e) {
    const { index } = e.detail;
    const { images } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onPageScroll({ scrollTop }) {
    const goodsTab = this.selectComponent('#goodsTab');
    goodsTab && goodsTab.onScroll(scrollTop);
  },



  addCart() {
    const { isAllSelectedSku } = this.data;
    Toast({
      context: this,
      selector: '#t-toast',
      message: isAllSelectedSku ? '点击加入购物车' : '请选择规格',
      icon: '',
      duration: 1000,
    });
  },


  promotionChange(e) {
    const { index } = e.detail;
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${index}`,
    });
  },


  getDetail(id) {
    Promise.all([fetchFood(id), getMenu()]).then(([details, menu]) => {
      const { primaryImage, price, soldNum } = details;
      this.setData({
        details,
        price,
        primaryImage,
        soldNum,
        totalAmount: menu.totalAmount,
      });
    });
  },

  // async getCommentsList() {
  //   try {
  //     const code = 'Success';
  //     const data = await getGoodsDetailsCommentList();
  //     const { homePageComments } = data;
  //     if (code.toUpperCase() === 'SUCCESS') {
  //       const nextState = {
  //         commentsList: homePageComments.map((item) => {
  //           return {
  //             goodsSpu: item.spuId,
  //             userName: item.userName || '',
  //             commentScore: item.commentScore,
  //             commentContent: item.commentContent || '用户未填写评价',
  //             userHeadUrl: item.isAnonymity
  //               ? this.anonymityAvatar
  //               : item.userHeadUrl || this.anonymityAvatar,
  //           };
  //         }),
  //       };
  //       this.setData(nextState);
  //     }
  //   } catch (error) {
  //     console.error('comments error:', error);
  //   }
  // },

  onShareAppMessage() {
    // 自定义的返回信息
    const { selectedAttrStr } = this.data;
    let shareSubTitle = '';
    if (selectedAttrStr.indexOf('件') > -1) {
      const count = selectedAttrStr.indexOf('件');
      shareSubTitle = selectedAttrStr.slice(count + 1, selectedAttrStr.length);
    }
    return {
      imageUrl: this.data.details.primaryImage,
      title: this.data.details.title + shareSubTitle,
      path: `/pages/goods/details/index?id=${this.data.id}`,
    };
  },


  onLoad(query) {
    const { id } = query;
    this.setData({
      id: id,
    });
    this.getDetail(id);
    // console.log(this.data.details);
  },
});
