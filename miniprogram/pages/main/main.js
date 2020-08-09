// pages/shouye.js
var appInst =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toast: false,
    hideToast: false,
    searchValue:"请输入分数",
    eorror_msg:'未找到',
    pl:'北京',
    type:'请选择',
    f_score:{
      "江苏": 480,
      "上海": 660
    }
  },
  /**
   * placeholder抖动问题
  */
  focusFn:function(e){
    this.setData({
      searchValue:""
    })
  },
  blurFn:function(e){
    this.setData({
      searchValue:"请输入分数"
    })
  },
  /**
   * 选择考生类型
  */
  chooseType:function(e){
    wx.navigateTo({
      url: './user_type/user_type',
      success: (result)=>{
        
      },
      fail: ()=>{
        this.openToast()
      }
    });
  },
  /**
   * 警告弹窗
   */
  openToast: function () {
    this.setData({
      toast: true,
    });
    setTimeout(() => {
      this.setData({
        hideToast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
          bkgcolor: "#fff"
        });
      }, 150);
    }, 1500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(appInst.userData.pl!=''||appInst.userData.type!=''){
      this.setData({
        pl: appInst.userData.pl,
        type: appInst.userData.type
      })
    }
  },
  click: function(e){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function (res) {
        console.log(res.result.sum) // 3
      },
      fail: console.error
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