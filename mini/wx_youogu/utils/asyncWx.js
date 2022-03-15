export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      withSubscriptions: true,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      withSubscriptions: true,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      withSubscriptions: true,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export const showModal = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
export const showToast = (content, duration) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: content,
      icon: 'none',
      duration: duration || 5000,
    })
  })
}
export const login = (url) => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeour: 2000,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
