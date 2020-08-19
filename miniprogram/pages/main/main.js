// pages/shouye.js
var appInst = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //警告窗
    toast: false,
    hidetoast: false,
    error_msg: '未找到符合条件的学校',
    warn_icon:'warn',
    //输入框
    flag_color:'#dfe4ea',
    box_shadow:'',
    //用户数据
    pl: '北京',
    type: '请选择',
    value:'',
    f_score: {
      "江苏": 480,
      "上海": 660,
      "安徽": 750,
      "北京": 750,
      "福建": 750,
      "甘肃": 750,
      "广东": 750,
      "广西": 750,
      "贵州": 750,
      "河北": 750,
      "河南": 750,
      "黑龙江": 750,
      "湖北": 750,
      "湖南": 750,
      "吉林": 750,
      "江西": 750,
      "辽宁": 750,
      "内蒙古": 750,
      "宁夏": 750,
      "青海": 750,
      "山东": 750,
      "山西": 750,
      "陕西": 750,
      "四川": 750,
      "天津": 750,
      "西藏": 750,
      "新疆": 750,
      "云南": 750,
      "重庆": 750,
      "浙江": 750,
    }
  },
  /**
   * 获取成绩
  */
  getInput: function (e) {
    if(this.flag(e.detail.value)==3||this.flag(e.detail.value)==-1){
      this.setData({
        flag_color:'#fc5c65',
        box_shadow:'box-shadow: 0 0 15rpx #fc5c65;'
      })
    }else{
      this.setData({
        flag_color:'#dfe4ea',
        box_shadow:''
      })
    }
    if(e.detail.value==''){
      this.setData({
        flag_color:'#dfe4ea',
        box_shadow:''
      })
    }
    this.setData({
      value:e.detail.value
    })
  },
  /**
   * 成绩判断
  */
  flag: function(numb){
    if(numb>this.data.f_score[this.data.pl]){
      return 3
    }else if(numb==this.data.f_score[this.data.pl]){
      return 2
    }else if(numb <= 0){
      return -1
    }else if(numb <= 400){
      return 0
    }else{
      return 1
    }
  },
  /**
   * placeholder抖动问题
  */
  focusFn: function (e) {
    this.setData({
      searchValue: ""
    })
  },
  blurFn: function (e) {
    this.setData({
      searchValue: "请输入分数"
    })
  },
  /**
   * 选择考生类型
  */
  chooseType: function (e) {
    wx.navigateTo({
      url: './user_type/user_type',
      success: (result) => {
      },
      fail: () => {
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
        hidetoast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hidetoast: false,
          bkgcolor: "#fff"
        });
      }, 100);
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (appInst.userData.pl != '' || appInst.userData.type != '') {
      this.setData({
        pl: appInst.userData.pl,
        type: appInst.userData.type
      })
    }
  },
  findSchools: function () {
    if(this.data.type=="请选择"){
      this.setData({
        error_msg:'请选择高考科类',
        warn_icon: 'info',
        flag_color:'#dfe4ea',
        box_shadow:'',
        value:''
      })
      this.openToast()
      return 
    }
    console.log(this.data)
    if(this.data.value>this.data.f_score[this.data.pl]){
      this.setData({
        error_msg:'请输入正确成绩',
        flag_color:'#dfe4ea',
        warn_icon: 'warn',
        box_shadow:'',
        value:''
      })
      this.openToast()
    }else if(this.data.value==''){
      this.setData({
        error_msg:'成绩不能为空',
        warn_icon: 'warn',
        flag_color:'#dfe4ea',
        box_shadow:'',
        value:''
      })
      this.openToast()
    }else if(this.data.value==this.data.f_score[this.data.pl]){
      wx.navigateTo({
        url: './screening_university/screening_university?flag=0&score='+this.data.value,
      });
    }else if(this.data.value <= 0){
      this.setData({
        error_msg:'请输入正确成绩',
        warn_icon: 'warn',
        flag_color:'#dfe4ea',
        box_shadow:'',
        value:''
      })
      this.openToast()
    }else if(this.data.value < 400){
      this.setData({
        error_msg:'未找到符合条件的学校',
        warn_icon: 'info',
        flag_color:'#dfe4ea',
        box_shadow:'',
        value:''
      })
      this.openToast()
    }else{
      appInst.userData.score = this.data.value
      wx.navigateTo({
        url: './screening_university/screening_university?flag=1&score='+this.data.value,
      });
    }
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