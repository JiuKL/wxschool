const db = wx.cloud.database({
  env: 'msgid'
})
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 处理弹窗
     */
    toast: false,
    loading: false,
    hideToast: false,
    hideLoading: false,
    eorror_msg:'未找到',
    findvalue: '',
    bkgcolor: "#fff",
    slist: []
  },
  getInput: function (e) {
    this.setData({
      findvalue: e.detail.value
    })
  },
  find() {
    var that = this
    console.log(this.data.findvalue)
    db.collection('s_msg').where({
      name: that.data.findvalue
    }).get({
      success: function (res) {
        console.log(res)
        if (res.data.length == 0) {
          that.openToast()
        }else if(res.data.length != 1){
          that.setData({
            eorror_msg: '数据库数据错误'
          })
        }else{
          wx.navigateTo({
            url:'../school/index/index?id='+res.data[0]._id
          })
        }

      },
      error: function (res) {
        that.openToast()
      }
    })
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
        });
      }, 150);
    }, 1500);
  },
  /**
   * 加载弹窗
  */
  openLoading: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      this.setData({
        hideLoading: true
      });
      setTimeout(() => {
        this.find()
        this.setData({
          loading: false,
          hideLoading: false,
        });
      }, 150);
    }, 1500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('s_msg').orderBy('hot_list', 'desc').get({
      success: function (res) {
        that.setData({
          slist: res.data
        })
        console.log(that.data.slist)
      },
      error: function (res) {
        console.log(res)
      }
    })
  },
  clickF: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var newhot = this.data.slist[index].hot_list + 1
    var l_hot = "slist[" + index + "].hot_list"
    db.collection('s_msg').doc(e.currentTarget.dataset.id).update({
      // data 传入需要局部更新的数据
      data: {
        hot_list: newhot
      }
    }).then(res => {
      that.setData({
        [l_hot]: newhot
      })
      console.log(res)
    })
    wx.navigateTo({
      url: '../school/index/index?id=' + e.currentTarget.dataset.id,
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