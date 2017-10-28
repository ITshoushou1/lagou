/*
 * @Author: guojingfeng
 * @Date: 2017-09-30 10:21:45
 * @Last Modified by: guojingfeng
 * @Last Modified time: 2017-10-28 18:33:46
 */
const http = require('../../utils/http.js')
const app = getApp()

Page({
  data: {
    header: {
      title: '用户登录',
      leftIcon: true,
      rightIcon: false
    }
  },

  /**
   * 提交登录表单
   *
   * @param {any} e 提交表单事件对象
   */
  formSubmit(e) {
    // 因为是开发案例，所以密码不打算使用AES、RSA加密
    // 当然，因为测试服务端需要能获取到原本密码，MD5也没必要
    let options = {
      method: 'POST',
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      }
    }
    http(app.apiName.login, options).then(res => {
      if(res.state == 1) {
        app.isLogin = true
        app.globalData.userInfo = res.content
        this.goBack() // 跳转回登录前界面
      } else {
      }
    })
  },

  goBack() {
    wx.navigateBack()
  }
})
