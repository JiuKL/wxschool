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
      currentData : 0,
      school:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    console.log("id："+id)
    db.collection('s_msg').where({
      _id:id
      // _id:'aeb043d65f27bdb90028e29c6bb3ec24'
    }).get({
      success: function(res){
        that.setData({
          school:res.data[0]
        })
        console.log(that.data.school)
      }
    })
    
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
  },
  autoHeight: function() {
    wx.createSelectorQuery()
      .select("#end" + this.data.currentTab)
      .boundingClientRect()
      .select("#start" + this.data.currentTab)
      .boundingClientRect()
      .exec(rect => {
        let _space = rect[0].bottom - rect[1].top+49;
        _space = _space + "px";
        console.error("_space"+ _space)
        this.setData({
          swiper_height: _space
        });
      });
     
      console.error(this.data.swiper_height);
  }
  
})


