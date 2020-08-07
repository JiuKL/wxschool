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
      pl:'',//省份下标
      type:'',//种类下标
      year:'',//时间下标
      batch:'',//批次下标
      gallery: false,//画廊
      currentData : 0,//当前页面id
      pics:[],//图片
      school:{},//学校信息
      s_plan:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var id = options.id;
    var that = this;
    // console.log("id："+id)
    db.collection('s_msg').where({
      _id:id
      // _id:'0fa17ad55f2d2a630000b8fa4081349b'
    }).get({
      success: function(res){
        that.setData({
          school:res.data[0],
          pics:[
            'cloud://msgid.6d73-msgid-1259714111/show/'+res.data[0].name+'/'+res.data[0].name+'_pic1.jpg',
            'cloud://msgid.6d73-msgid-1259714111/show/'+res.data[0].name+'/'+res.data[0].name+'_pic2.jpg',
            'cloud://msgid.6d73-msgid-1259714111/show/'+res.data[0].name+'/'+res.data[0].name+'_pic3.jpg',
            'cloud://msgid.6d73-msgid-1259714111/show/'+res.data[0].name+'/'+res.data[0].name+'_pic4.jpg'
          ]
        })
        db.collection('s_plan').where({
          name:res.data[0].name
        }).get({
          success: function(res){
            that.setData({
              s_plan:res.data[0]//学校招生计划
            })
            that.init()
            wx.hideLoading();
            console.log(that.data.school)
            console.log(that.data.s_plan)
          }
        })
      }
    })
    
  },
  /**
   * 招生页面初始化
  */
  init: function(){
    var that = this
    this.setData({
      pl: that.data.s_plan.pls[0],
      type:that.data.s_plan.plan[that.data.s_plan.pls[0]].type[0],
      year:that.data.s_plan.plan[that.data.s_plan.pls[0]].year[0],
      batch:that.data.s_plan.plan[that.data.s_plan.pls[0]].batch[0]
    })
  },
  /**
   * 查看更多跳转
  */
  moreClick: function(e){
    let article = JSON.stringify(this.data.school.msg)
    var that = this
    wx.navigateTo({
      url: '../s_about/s_about?name='+that.data.school.name+'&article='+article,
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
   * 招生计划选择
  */
  pickerProvince: function(e){
    var that = this
    this.setData({
      pl: that.data.s_plan.pls[e.detail.value],
      type:that.data.s_plan.plan[that.data.s_plan.pls[e.detail.value]].type[0],
      year:that.data.s_plan.plan[that.data.s_plan.pls[e.detail.value]].year[0],
      batch:that.data.s_plan.plan[that.data.s_plan.pls[e.detail.value]].batch[0]
    })
    console.log(this.data)
    // this.onLoad()
  },
  pickerType: function(e){
    var that = this
    this.setData({
      type:that.data.s_plan.plan[that.data.pl].type[e.detail.value]
    })
    console.log(this.data)
    // this.onLoad()
  },
  pickerYear: function(e){
    var that = this
    this.setData({
      year: that.data.s_plan.plan[that.data.pl].year[e.detail.value]
    })
    console.log(this.data)
    // this.onLoad()
  },
  pickerBatch: function(e){
    var that = this
    this.setData({
      batch:that.data.s_plan.plan[that.data.pl].batch[e.detail.value]
    })
    console.log(this.data)
    // this.onLoad()
  },
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
 
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
 
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }
  
})


