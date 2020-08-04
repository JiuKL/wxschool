
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log("data信息是否在当前版本可用："+this.data.canIUse)
    //获取用户授权信息
    wx.getSetting({
      success: function(res){
        //返回值authSetting 类型：AuthSetting 用户授权结果
        // AuthSetting
        // 用户授权设置信息，详情参考权限
        // 属性
        // boolean scope.userInfo
        // 是否授权用户信息，对应接口 wx.getUserInfo
        // boolean scope.userLocation
        // 是否授权地理位置，对应接口 wx.getLocation, wx.chooseLocation
        // boolean scope.address

        console.log(res.authSetting)
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(res){
              console.log(res.userInfo)
              that.setData({
                nickName: res.userInfo.nickName,
                imgUrl: res.userInfo.avatarUrl
              })
            },
            error(res){
              console.log(res.userInfo)
              that.setData({
                canIUse: false
              })
            }
          })
        }else{
          that.setData({
            canIUse: false
          })
        }
      },
      error: function (res){
        console.log(res)
        that.setData({
          canIUse: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})