import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import _ from 'lodash'
import { AtModal, AtForm, AtModalContent, AtInput, AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { ICommonStore } from '@/stores/commonStore'
import { action } from 'mobx'
import userService from '@/services/userService'
import './index.scss'

interface State {
  phone: string | null
  verifyCode: string | null
  sendTimer: number
}

interface UserSignModalProps {
  signDone?: () => void
}

interface InjectStoreProps extends UserSignModalProps {
  commonStore: ICommonStore
}

/**
 * 用户注册弹窗
 */
@inject('commonStore')
@observer
class UserSignModal extends Component<UserSignModalProps, State> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  static defaultProps = { signDone: null }

  readonly state: State = {
    phone: null,
    verifyCode: null,
    sendTimer: 0
  }

  private sendCodeTimer: any = null

  @action
  handleClose () {
    this.inject.commonStore.isSignModalOpened = false
  }

  handlePhoneChange (value: string) {
    this.setState({ phone: value })
  }

  handleVerifyCodeChange (value: string) {
    this.setState({ verifyCode: value })
  }

  handleGetUserInfo = event => {
    console.log('getUserInfo:', event.detail)

    this.handleSendCode()
  }

  /**
   * 发送验证码
   */
  handleSendCode = () => {
    const { phone } = this.state

    // 检查手机号
    if (!phone || !/^1(3|4|5|7|8|9)\d{9}$/.test(phone)) {
      Taro.showToast({ title: '请输入正确的手机号！', icon: 'none' })
    } else {
      userService
        .fetchVerifyCode({ mobile: phone, action: 'register' })
        .then(() => {
          Taro.showToast({ title: '发送成功！', icon: 'none' })
          if (this.sendCodeTimer !== null) {
            clearInterval(this.sendCodeTimer)
          }

          this.setState({ sendTimer: 60 })

          // 按钮开始倒计时
          this.sendCodeTimer = setInterval(() => {
            if (this.state.sendTimer === 0) {
              clearInterval(this.sendCodeTimer)
            } else {
              this.setState({ sendTimer: this.state.sendTimer - 1 })
            }
          }, 1000)
        })
        .catch(err => {
          Taro.showToast({ title: err.message, icon: 'none' })
        })
    }
  }

  /**
   * 注册
   */
  handleSignIn () {
    const { phone, verifyCode } = this.state

    // 检查手机号
    if (!phone || !/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      Taro.showToast({ title: '请输入正确的手机号！', icon: 'none' })
    } else if (!verifyCode) {
      Taro.showToast({ title: '请输入验证码！', icon: 'none' })
    } else {
      Taro.login().then(loginData => {
        Taro.getUserInfo().then(data => {
          const signPageData = Taro.getApp().signPageData

          console.log('注册获取的微信Code:', loginData.code)
          console.log('页面重定向信息:', signPageData)

          // 重新获取weixin_token
          userService
            .fetchUserAuth({ code: loginData.code, encrypted_data: data.encryptedData, iv: data.iv })
            .then(token => {
              Taro.setStorageSync('weixin_token', token.weixin_token)

              console.log('注册信息: ', {
                weixin_token: token.weixin_token,
                mobile: phone,
                mobile_verify_code: verifyCode,
                nickname: data.userInfo.nickName,
                sex: data.userInfo.gender === '0' ? '3' : data.userInfo.gender, // 微信状态：0：未知、1：男、2：女
                avatar: data.userInfo.avatarUrl
              })

              // 用新的weixin_token注册
              return userService.fetchUserSignIn({
                weixin_token: token.weixin_token,
                mobile: phone,
                mobile_verify_code: verifyCode,
                nickname: data.userInfo.nickName,
                sex: data.userInfo.gender === '0' ? '3' : data.userInfo.gender, // 微信状态：0：未知、1：男、2：女
                avatar: data.userInfo.avatarUrl
              })
            })
            .then(res => {
              console.log('注册成功:', res)
              // 注册成功
              Taro.setStorageSync('access_token', res.access_token)

              this.props.signDone && this.props.signDone()
              // 如果redirectPage 不为空 跳转回来源页
              if (signPageData && signPageData.redirectPage) {
                Taro.reLaunch({ url: '/' + signPageData.redirectPage }).catch(() => {
                  Taro.reLaunch({ url: '/pages/store/index' })
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    }
  }

  render () {
    const { commonStore: { isSignModalOpened }} = this.inject

    return (
      <AtModal closeOnClickOverlay={false} className='signinWrap' onClose={this.handleClose} isOpened={isSignModalOpened}>
        <AtModalContent>
          <AtForm onSubmit={this.handleSignIn.bind(this)}>
            <View className='signinForm'>
              <View className='formItem'>
                <Text className='icon iconPhone' />
                <AtInput
                  className='phoneInput'
                  name='phone'
                  type='phone'
                  placeholder='请输入手机号码'
                  value={this.state.phone || ''}
                  onChange={this.handlePhoneChange.bind(this)}
                />
              </View>
              <View className='formItem formItemCode'>
                <Text className='icon iconSafe' />
                <AtInput
                  className='verifyCodeInput'
                  name='verifyCode'
                  type='number'
                  placeholder='请输入验证码'
                  value={this.state.verifyCode || ''}
                  onChange={this.handleVerifyCodeChange.bind(this)}
                />
                <AtButton
                  circle
                  className='sendBtn'
                  type='primary'
                  openType='getUserInfo'
                  onGetUserInfo={this.handleGetUserInfo}
                  disabled={this.state.sendTimer > 0}
                >
                  获取验证码{this.state.sendTimer > 0 ? `(${this.state.sendTimer}s)` : ''}
                </AtButton>
              </View>
              <View className='formItem'>
                <AtButton formType='submit' className='submitBtn' circle type='primary'>
                  立即注册
                </AtButton>
              </View>
            </View>
          </AtForm>
        </AtModalContent>
      </AtModal>
    )
  }
}

export default UserSignModal
