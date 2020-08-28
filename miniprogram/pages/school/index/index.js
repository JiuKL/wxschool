//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database({
  env: 'msgid'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan_pl: '',//省份下标
    plan_type: '',//种类下标
    plan_year: '',//时间下标
    plan_batch: '',//批次下标

    grade_pl: '',//录取分数省份下标
    grade_type: '',//录取分数种类下标

    gallery: false,//画廊
    currentData: 0,//当前页面id
    pics: [],//图片
    school: {},//学校信息
    s_grade: {},//学校各省分数线信息
    s_plan: {},//计划招生信息

    flag_plan:0,
    flag_grade:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var id = options.id;
    var that = this;
    // console.log("id："+id)
    db.collection('s_msg').where({
      _id:id
      // _id: '0fa17ad55f2d2a630000b8fa4081349b'
    }).get({
      success: function (res) {
        that.setData({
          school: res.data[0],
          pics: [
            'cloud://msgid.6d73-msgid-1259714111/show/' + res.data[0].name + '_pic1.jpg',
            'cloud://msgid.6d73-msgid-1259714111/show/' + res.data[0].name + '_pic2.jpg',
            'cloud://msgid.6d73-msgid-1259714111/show/' + res.data[0].name + '_pic3.jpg',
            'cloud://msgid.6d73-msgid-1259714111/show/' + res.data[0].name + '_pic4.jpg'
          ]
        })
        db.collection('s_plan').where({
          name: res.data[0].name
        }).get({
          success: function (res) {
            that.setData({
              s_plan: res.data[0],//学校招生计划
              plan_pl: res.data[0].pls[0],
              plan_type: res.data[0].plan[res.data[0].pls[0]].type[0],
              plan_year: res.data[0].plan[res.data[0].pls[0]].year[0],
              plan_batch: res.data[0].plan[res.data[0].pls[0]].batch[0],
              flag_plan:1
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
        db.collection('s_grade').where({
          name: res.data[0].name
        }).get({
          success: function (res) {
            that.setData({
              s_grade: res.data[0],//学校招生计划
              grade_pl: res.data[0].pls[0],
              grade_type: res.data[0].grade.type[0],
              flag_grade:1
            })

            console.log(that.data)

          },
          fail: function (res) {
            console.log(res)
          },
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
    setTimeout(()=>{
      console.log(that.data)
      wx.hideLoading();
    },3000)
  },
  /**
   * 查看更多跳转
  */
  moreClick: function (e) {
    let article = JSON.stringify(this.data.school.msg)
    var that = this
    wx.navigateTo({
      url: '../s_about/s_about?name=' + that.data.school.name + '&article=' + article,
    });
  },
  /**
   * 画廊开启，关闭
  */
  close: function () {
    this.setData({
      gallery: false,
    });
  },
  open: function () {
    this.setData({
      gallery: true
    });
  },
  /**
   * 类别选择
  */
  pickerProvince: function (e) {
    var that = this
    if (this.data.currentData == 2) {
      this.setData({
        plan_pl: that.data.s_plan.pls[e.detail.value],
        plan_type: that.data.s_plan.plan[that.data.s_plan.pls[e.detail.value]].type[0],
        plan_year: that.data.s_plan.plan[that.data.s_plan.pls[e.detail.value]].year[0],
        plan_batch: that.data.s_plan.plan[that.data.s_plan.pls[e.detail.value]].batch[0]
      })
    } else if (this.data.currentData == 1) {
      this.setData({
        grade_pl: that.data.s_grade.pls[e.detail.value],
        grade_type: that.data.s_grade.grade.type[0]
      })
    }

    console.log(this.data)
  },
  pickerType: function (e) {
    var that = this
    if (this.data.currentData == 2) {
      this.setData({
        type: that.data.s_plan.plan[that.data.pl].type[e.detail.value]
      })
    } else if (this.data.currentData == 1) {
      this.setData({
        grade_type: that.data.s_grade.grade.type[e.detail.value]
      })
    }
    console.log(this.data)
  },
  pickerYear: function (e) {
    var that = this
    this.setData({
      year: that.data.s_plan.plan[that.data.pl].year[e.detail.value]
    })
    console.log(this.data)
  },
  pickerBatch: function (e) {
    var that = this
    this.setData({
      batch: that.data.s_plan.plan[that.data.pl].batch[e.detail.value]
    })
    console.log(this.data)
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 跳转class页面
  */
  goClass: function(){
    wx.navigateTo({
      url: '../class/class?classes='+JSON.stringify(this.data.school.open_class)
    });
  },
  /**
   * 跳转一流学科
  */
  goDClass: function(){
    wx.navigateTo({
      url: '../d_fir_class/d_fir_class?dclass='+JSON.stringify(this.data.school.D_first_class)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.onLoad({id:this.data.school._id})
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.hideLoading();
    }, 1000)
  },
})


