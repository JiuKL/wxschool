// miniprogram/pages/main/screening_university/screening_university.js
var appInst = getApp();
const db = wx.cloud.database({
  env: 'msgid'
})
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '',
    user_province: '',
    user_type: '',
    universitys: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var that = this
    this.setData({
      score: parseInt(options.score),
      user_province: appInst.userData.pl,
      user_type: appInst.userData.type
    })
    //测试数据
    // this.setData({
    //   score: 665,
    //   user_province:'北京',
    //   user_type:'理科'
    // })
    // var grade = 'grade.北京.理科.0.l_grade'
    /////////////////////////////////
    appInst.userData.score = this.data.score
    var grade = 'grade.' + appInst.userData.pl + '.' + appInst.userData.type + '.0.l_grade'

    db.collection('s_grade').where({
      [grade]: _.lte(that.data.score + 20)
    }).limit(20).get({
      success: function (res) {
        res.data.forEach(element => {
          db.collection('s_msg').where({
            name: element.name
          }).get().then(res => {
            that.setData({
              universitys: that.data.universitys.concat(res.data)
            })
            var local_province = 'universitys[' + (that.data.universitys.length - 1) + '].local_province'
            var grade = 'universitys[' + (that.data.universitys.length - 1) + '].grade'
            // console.log(local_province)
            // console.log(grade)
            that.setData({
              [local_province]: element.local_province,
              [grade]: element.grade
            })
          })
        });
      }
    })
    setTimeout(() => {
      wx.hideLoading();
    }, 1500)
    console.log(this.data)
  },
  /**
     * 加载大学详情
    */
  goUniversity: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var newhot = this.data.universitys[index].hot_list + 1
    db.collection('s_msg').doc(e.currentTarget.dataset.id).update({
      // data 传入需要局部更新的数据
      data: {
        hot_list: newhot
      }
    }).then(res => {
      console.log(res)
    })
    wx.navigateTo({
      url: '../../school/index/index?id=' + e.currentTarget.dataset.id,
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