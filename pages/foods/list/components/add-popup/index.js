import { addFood, getAllFoods } from '../../../../../api/food';

Component({
  properties: {
    showAddFoodPopup: {
      type: Boolean,
      value: false,
      observer(showAddFoodPopup) {
        this.setData({ showAddFoodPopup });
      },
    },
    groupId: {
      type: String,
      value: '',
      observer(groupId) {
        this.setData({ groupId });
      }
    }
  },
  data: {
    showAddFoodPopup: true,
    foodFields: {
      title: '',
      desc: '',
      primaryImage: '',
      images: [],
      price: '',
    },
  },
  methods: {
    handleAddFoodClick() {
      this.setData({
        showAddFoodPopup: true,
      });
    },

    handleCancel() {
      this.setData({
        showAddFoodPopup: false,
      });
    },

    handleConfirm(e) {
      // 新增菜品的逻辑
      // this.triggerEvent('done', e.detail);
      getAllFoods()
        .then((allFoods) => {
          const id = allFoods.length ? String(parseInt(allFoods[allFoods.length - 1].id) + 1) : '1';
          const food = {
            id,
            ...this.data.foodFields,
            groupId: this.data.groupId,
            soldNum: 0,
          };
          return {
            allFoods,
            food,
          };
        })
        .then(({ allFoods, food }) => {
          return addFood(allFoods, food);
        })
        .then(() => {
          wx.showToast({
            title: '添加菜品成功',
            icon: 'success',
          });
          this.triggerEvent('done', e);
        })
        .catch((error) => {
          // 错误处理
          wx.showToast({
            title: '添加菜品失败',
            icon: 'error',
          });
          console.error('添加菜品失败:', error);
        });
    },

    handleFieldInput(e) {
      const { field } = e.currentTarget.dataset;
      this.setData({
        [`foodFields.${field}`]: e.detail.value,
      });
    },
    handleUploadImage(e) {
      const { field } = e.currentTarget.dataset;
      wx.chooseImage({
        count: field === 'images' ? 9 : 1,
        success: (res) => {
          if (field === 'images') {
            this.setData({
              [`foodFields.${field}`]: [...this.data.foodFields[field], ...res.tempFilePaths],
            });
          } else {
            this.setData({
              [`foodFields.${field}`]: res.tempFilePaths[0],
            });
          }
        },
      });
    },
  },
});


