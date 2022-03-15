import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import CommonStore from '@/stores/commonStore'
import ProductStore from '@/stores/productStore'
import CartStore from '@/stores/cartStore'
import OrderStore from '@/stores/orderStore'
import UserStore from '@/stores/userStore'
import './app.scss'
import userService from './services/userService'
import { autorun } from 'mobx'

const store = {
  commonStore: new CommonStore(),
  productStore: new ProductStore(),
  cartStore: new CartStore(),
  orderStore: new OrderStore(),
  userStore: new UserStore()
}

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/store/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/order/index',
      'pages/user/share/index',
      'pages/user/recharge/index',
      'pages/user/activity/index',
      'pages/user/withdraw/index',
      'pages/user/about/index',
      'pages/user/trade_record/index',
      'pages/order/detail/index',
      'pages/checkout/index',
      'pages/checkout/result/index',
      'pages/store/search/index',
      'pages/store/product/index',
      'pages/user/coupon/index',
      'pages/common/outurl/index'
    ],
    tabBar: {
      color: '#999999',
      selectedColor: '#000000',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/store/index',
          text: '首页',
          iconPath: 'assets/images/icon/icon-home.png',
          selectedIconPath: 'assets/images/icon/icon-home-f.png'
        },
        {
          pagePath: 'pages/cart/index',
          text: '购物车',
          iconPath: 'assets/images/icon/icon-cart.png',
          selectedIconPath: 'assets/images/icon/icon-cart-f.png'
        },
        {
          pagePath: 'pages/order/index',
          text: '订单',
          iconPath: 'assets/images/icon/icon-order.png',
          selectedIconPath: 'assets/images/icon/icon-order-f.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我',
          iconPath: 'assets/images/icon/icon-user.png',
          selectedIconPath: 'assets/images/icon/icon-user-f.png'
        }
      ]
    },
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '首页',
      backgroundColor: '#ffffff',
      backgroundTextStyle: 'light'
    }
  }

  componentDidMount () {
    Taro.login()
      .then(res => userService.fetchUserAuth({ code: res.code }))
      .then(res => {
        Taro.setStorageSync('weixin_token', res.weixin_token)
        Taro.setStorageSync('access_token', res.youhui_token)
      })

    // 获取购物车数量
    store.cartStore.fetchCartNum()

    autorun(() => {
      if (store.cartStore.cartNum === 0) {
        Taro.removeTabBarBadge({ index: 1 })
      } else {
        Taro.setTabBarBadge({ index: 1, text: store.cartStore.cartNum.toString() }).catch(() => {
          console.log('设置失败，回Tab页重新调用')
          store.cartStore.updatedCartNum = false
        })
      }
    })
  }

  // 在 App 类中的 render() 函数没有实际 作用
  // 请勿修改此函数
  render () {
    return <Provider store={store} />
  }
}

Taro.render(<App />, document.getElementById('app'))
