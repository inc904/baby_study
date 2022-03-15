/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
Component({
  data: {
    color: '#999999',
    selectedColor: '#000000',
    backgroundColor: '#ffffff',
    pages: [],
    list: [
      {
        pagePath: '/pages/store/index',
        text: '首页',
        iconPath: '/assets/images/icon/icon-home.png',
        selectedIconPath: '/assets/images/icon/icon-home-f.png'
      },
      {
        pagePath: '/pages/cart/index',
        text: '购物车',
        iconPath: '/assets/images/icon/icon-cart.png',
        selectedIconPath: '/assets/images/icon/icon-cart-f.png'
      },
      {
        pagePath: '/pages/order/index',
        text: '订单',
        iconPath: '/assets/images/icon/icon-order.png',
        selectedIconPath: '/assets/images/icon/icon-order-f.png'
      },
      {
        pagePath: '/pages/user/index',
        text: '我',
        iconPath: '/assets/images/icon/icon-user.png',
        selectedIconPath: '/assets/images/icon/icon-user-f.png'
      }
    ]
  },
  attached () {},
  methods: {
    switchTab (e) {
      var data = e.currentTarget.dataset
      var url = data.path

      wx.switchTab({ url })
      this.setData({ selected: data.index })
    }
  }
})
