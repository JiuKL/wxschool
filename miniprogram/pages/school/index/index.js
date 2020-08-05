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
      gallery: false,//画廊
      currentData : 0,//当前页面id
      pics:[],
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
      // _id:'aeb043d65f27bdb90028e2a2125d70f9'
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
        console.log(that.data.school)
      }
    })
    
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


