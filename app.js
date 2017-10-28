//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: {}
  },
  isLogin: false,
  navTo(routerName, qeury) {
    let routes = {
      index: "../index/index",
      search: "../search/search",
      mine: "../mine/mine",
      customInfo: "../customInfo/customInfo",
      customDetail: "../customDetail/customDetail",
      resume: "../resume/resume",
      collection: "../collection/collection",
      deliver: "../deliver/deliver",
      deliverDetail: "../deliverDetail/deliverDetail",
      positionDetail: "../positionDetail/positionDetail",
      companyDetail: "../companyDetail/companyDetail",
      interview: "../interview/interview",
      login: "../login/login"
    }

    let options = {}

    // 需要登录才能访问的路由
    let isLoginRoute = ['customInfo', 'customDetail', 'resume', 'collection', 'deliver', 'deliverDetail', 'interview']
    if (!this.isLogin && isLoginRoute.find((item) => item == routerName)) {
      options.url = routes.login
      wx.navigateTo(options)
      return
    }

    // tab页面只能用wx.switchTab()进行跳转
    let tabs = ['index', 'search', 'mine']
    if (tabs.find((item) => item == routerName)) {
      options.url = routes[routerName]
      wx.switchTab(options)
    }

    if (routes[routerName]) {
      options.url = routes[routerName]
    } else {
      wx.redirectTo({
        url: routes.index
      })
      return
    }


    if (qeury) {
      let arr = []
      for (let item of Object.keys(qeury)) {
        arr.push(item + '=' + qeury[item])
      }
      options.url += '?' + arr.join('&')
    }

    wx.navigateTo(options)
  },
  picHost: 'https://static.lagou.com/',
  apiName: { // 所有接口名称
    indexList: 'index/list', // 首页列表
    positionDetail: 'position/positionId', // 职位详情
    companyDetail: 'company/companyId', // 公司招聘信息
    cities: 'cities', // 城市列表
    search: 'search', // 搜索职位
    login: 'user/login', // 登录接口
  }
})
