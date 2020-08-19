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
    u_pl: '全部',
    user_province: '',
    user_type: '',
    universitys: [],
    u_province: [
      "全部",
      "江苏",
      "上海",
      "安徽",
      "北京",
      "福建",
      "甘肃",
      "广东",
      "广西",
      "贵州",
      "河北",
      "河南",
      "黑龙江",
      "湖北",
      "湖南",
      "吉林",
      "江西",
      "辽宁",
      "内蒙古",
      "宁夏",
      "青海",
      "山东",
      "山西",
      "陕西",
      "四川",
      "天津",
      "西藏",
      "新疆",
      "云南",
      "重庆",
      "浙江",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t_universitys = [];//用变量操作完成再页面渲染，否则页面渲染易出错
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
      [grade]: _.lte(that.data.score + 20).and(_.gte(that.data.score - 90))
      // [grade]: _.lte(that.data.score + 20)
    })
      .orderBy(grade, 'desc')
      .limit(20)
      .get({
        success: function (res) {
          /**
           * 连接表查询
          */
          res.data.forEach(element => {
            db.collection('s_msg').where({
              name: element.name
            }).get().then(res => {
              t_universitys = t_universitys.concat(res.data)
              t_universitys[t_universitys.length - 1].local_province = element.local_province
              t_universitys[t_universitys.length - 1].grade = element.grade
            })
          });

          setTimeout(() => {

            var sortjson = t_universitys.sort(that.compare())
            that.setData({
              universitys: sortjson
            })
            wx.hideLoading();
          }, 1500)
        }
      })



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
   * 排序方法
  */
  compare: function () {
    return function (a, b) {
      var value1 = a.grade[appInst.userData.pl][appInst.userData.type][0].l_grade;
      var value2 = b.grade[appInst.userData.pl][appInst.userData.type][0].l_grade;
      return value2 - value1;
    }
  },
  /**
   * 筛选学校
  */
  pickerProvince: function (e) {
    if(e.detail.value==0){
      this.onLoad({score:appInst.userData.score})
    }
    var t_universitys = [];
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var that = this
    this.setData({
      u_pl:this.data.u_province[e.detail.value],
      universitys:[]
    })
    var grade = 'grade.' + appInst.userData.pl + '.' + appInst.userData.type + '.0.l_grade'
    db.collection('s_grade').where({
      // [grade]: _.lte(that.data.score + 20).and(_.gte(that.data.score - 90))
      local_province:that.data.u_province[e.detail.value],
      [grade]: _.lte(that.data.score + 20)
    })
      .orderBy(grade, 'desc')
      .limit(20)
      .get({
        success: function (res) {
          /**
           * 连接表查询
          */
          res.data.forEach(element => {
            db.collection('s_msg').where({
              name: element.name
            }).get().then(res => {
              t_universitys = t_universitys.concat(res.data)
              t_universitys[t_universitys.length - 1].local_province = element.local_province
              t_universitys[t_universitys.length - 1].grade = element.grade
            })
          });

          setTimeout(() => {

            var sortjson = t_universitys.sort(that.compare())
            that.setData({
              universitys: sortjson
            })
            wx.hideLoading();
          }, 1500)
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