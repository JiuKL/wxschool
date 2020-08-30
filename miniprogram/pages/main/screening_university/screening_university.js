// miniprogram/pages/main/screening_university/screening_university.js
var appInst = getApp();
const db = wx.cloud.database({
  env: 'msgid'
})
const _ = db.command
var school_list = []
var school_grade_list = []
var school_location_list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numb:0,
    flag: 0,
    score: '',
    location: '',
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
    school_list = []
    school_grade_list = []
    school_location_list = []
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var that = this
    this.setData({
      flag: options.flag,
      user_province: appInst.userData.pl,
      user_type: appInst.userData.type
    })
    console.log(options)
    if (options.flag == 0) {
      this.setData({
        score: parseInt(options.score)
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
        [grade]: _.lte(that.data.score + 50).and(_.gte(that.data.score - 100)).and(_.neq(0))
        // [grade]: _.lte(that.data.score + 20)
      })
        .orderBy(grade, 'desc')
        .limit(20)
        .get({
          success: function (res) {
            console.log("学校分数数据")
            console.log(res)
            /**
             * 连接表查询
            */
            res.data.forEach(element => {
              db.collection('s_msg').where({
                name: element.name
              }).get().then(res => {
                if (res.data.length != 0) {
                  that.setData({
                    numb: 1
                  })
                  t_universitys = t_universitys.concat(res.data)
                  t_universitys[t_universitys.length - 1]['local_province'] = element.local_province
                  t_universitys[t_universitys.length - 1]['grade'] = element.grade
                }
                /**
                 * 导入学校数据，用于图表展示
                */
                console.log(t_universitys)
                for (let i = 0; i < t_universitys.length; i++) {
                  school_list[i] = t_universitys[i].name
                  school_grade_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_grade
                  school_location_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_precedence
                }
                appInst.school_list = school_list
                appInst.school_grade_list = school_grade_list
                that.setData({
                  universitys: t_universitys
                })
              })
            });
            setTimeout(() => {
              wx.hideLoading();
            }, 1500)
          }
        })
    } else {
      this.setData({
        location: parseInt(options.location)
      })
      appInst.userData.location = options.location

      var location = 'grade.' + appInst.userData.pl + '.' + appInst.userData.type + '.0.l_precedence'
      db.collection('s_grade').where({
        [location]: _.gte(that.data.location-1000).and(_.lte(that.data.location + 1000).and(_.neq(0)))
        // [grade]: _.lte(that.data.score + 20)
      })
        .orderBy(location, 'asc')
        .get({
          success: function (res) {
            console.log("学校位次数据")
            console.log(res)
            /**
             * 连接表查询
            */
            res.data.forEach(element => {
              if (element['grade'].hasOwnProperty(appInst.userData.pl)) {
                db.collection('s_msg').where({
                  name: element.name
                }).get().then(res => {
                  console.log(res)
                  if (res.data.length != 0) {
                    that.setData({
                      numb: 1
                    })
                    t_universitys.push(res.data[0])
                    t_universitys[t_universitys.length - 1]['local_province'] = element.local_province
                    t_universitys[t_universitys.length - 1]['grade'] = element.grade

                    /**
                    * 导入学校数据，用于图表展示
                    */
                    for (let i = 0; i < t_universitys.length; i++) {
                      if (t_universitys[i].grade.hasOwnProperty(that.data.user_province) && t_universitys[i].grade[that.data.user_province].hasOwnProperty(that.data.user_type)) {
                        school_list[i] = t_universitys[i].name
                        school_location_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_precedence
                        school_grade_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_grade
                      }

                    }
                    appInst.school_list = school_list
                    appInst.school_location_list = school_location_list
                    // var sortjson = that.sort(t_universitys, 1)
                    that.setData({
                      universitys: t_universitys
                    })
                  }
                })
              }
            });
            setTimeout(() => {
              wx.hideLoading();
            }, 1500)
          }
        })
    }

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
  sort: function (list, flag) {
    if (flag == 0) {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
          if (list[j].grade[appInst.userData.pl][appInst.userData.type][0].l_grade < list[j + 1].grade[appInst.userData.pl][appInst.userData.type][0].l_grade) {
            var t = list[j];
            list[j] = list[j + 1];
            list[j + 1] = t;
          }
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
          if (list[j].grade[appInst.userData.pl][appInst.userData.type][0].l_precedence > list[j + 1].grade[appInst.userData.pl][appInst.userData.type][0].l_precedence) {
            var t = list[j];
            list[j] = list[j + 1];
            list[j + 1] = t;
          }
        }
      }
    }

    return list;

  },
  /**
   * 筛选学校
  */
  pickerProvince: function (e) {
    if (e.detail.value == 0) {
      this.onLoad({ score: appInst.userData.score, flag: this.data.flag, location: appInst.userData.location })
    }
    var t_universitys = [];
    school_list = []
    school_grade_list = []
    school_location_list = []
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var that = this
    this.setData({
      u_pl: this.data.u_province[e.detail.value],
      universitys: []
    })
    if (this.data.flag == 0) {
      var grade = 'grade.' + appInst.userData.pl + '.' + appInst.userData.type + '.0.l_grade'
      db.collection('s_grade').where({
        [grade]: _.lte(that.data.score + 50).and(_.gte(that.data.score - 120).and(_.neq(0))),
        local_province: that.data.u_province[e.detail.value]
        // [grade]: _.lte(that.data.score + 20)
      })
        .orderBy(grade, 'desc')
        .limit(20)
        .get({
          success: function (res) {
            console.log(res.data)
            /**
             * 连接表查询
            */
            res.data.forEach(element => {
              db.collection('s_msg').where({
                name: element.name
              }).get().then(res => {
                if (res.data.length != 0) {
                  that.setData({
                    numb:1
                  })
                  t_universitys = t_universitys.concat(res.data)
                  t_universitys[t_universitys.length - 1].local_province = element.local_province
                  t_universitys[t_universitys.length - 1].grade = element.grade
                  /**
                   * 导入学校数据
                  */
                  for (let i = 0; i < t_universitys.length; i++) {
                    school_list[i] = t_universitys[i].name
                    school_grade_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_grade
                  }
                  appInst.school_list = school_list
                  appInst.school_grade_list = school_grade_list
                  that.setData({
                    universitys: t_universitys
                  })
                } else {
                  console.log(element.name)
                }
              })
            });
            setTimeout(() => {

              wx.hideLoading();
            }, 1500)
          }
        })
    } else {
      var location = 'grade.' + appInst.userData.pl + '.' + appInst.userData.type + '.0.l_precedence'
      db.collection('s_grade').where({
        [location]: _.gte(that.data.location-1000).and(_.lte(that.data.location + 1000).and(_.neq(0))),
        local_province: that.data.u_province[e.detail.value]
        // [grade]: _.lte(that.data.score + 20)
      })
        .orderBy(location, 'asc')
        .get({
          success: function (res) {
            console.log("学校位次数据")
            console.log(res)
            /**
             * 连接表查询
            */
            res.data.forEach(element => {
              if (element['grade'].hasOwnProperty(appInst.userData.pl)) {
                db.collection('s_msg').where({
                  name: element.name
                }).get().then(res => {
                  console.log(res)
                  if (res.data.length != 0) {
                    that.setData({
                      numb: 1
                    })
                    t_universitys.push(res.data[0])
                    t_universitys[t_universitys.length - 1]['local_province'] = element.local_province
                    t_universitys[t_universitys.length - 1]['grade'] = element.grade

                    /**
                    * 导入学校数据，用于图表展示
                    */
                    for (let i = 0; i < t_universitys.length; i++) {
                      if (t_universitys[i].grade.hasOwnProperty(that.data.user_province) && t_universitys[i].grade[that.data.user_province].hasOwnProperty(that.data.user_type)) {
                        school_list[i] = t_universitys[i].name
                        school_location_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_precedence
                        school_grade_list[i] = t_universitys[i].grade[that.data.user_province][that.data.user_type][0].l_grade
                      }

                    }
                    appInst.school_list = school_list
                    appInst.school_location_list = school_location_list
                    // var sortjson = that.sort(t_universitys, 1)
                    that.setData({
                      universitys: t_universitys
                    })
                  }
                })
              }
            });
            setTimeout(() => {
              wx.hideLoading();
            }, 1500)
          }
        })
    }
  },
  gochart: function () {
    wx.navigateTo({
      url: '../../line_chart/line_chart?school_list=' + JSON.stringify(school_list) + '&school_grade_list=' + JSON.stringify(school_grade_list) + '&school_location_list=' + JSON.stringify(school_location_list) + '&flag=' + this.data.flag,
    });
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