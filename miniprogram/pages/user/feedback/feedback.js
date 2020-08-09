var appInst =  getApp();
const db = wx.cloud.database({
  env: 'msgid'
})
Page({
  data: {
    txtvalue:'',
    nickname: '',
    toast: false,
    hideToast: false,
    len:0
  },
  onLoad: function (options) {
    this.setData({
      nickname:appInst.userData.nickname
    })
    if(appInst.userData.openid=="oDgLn5QjEIFWDy_08buxPomMdlwY"){
      db.collection('feedback').get().then(res=>{
        console.log(res.data)
      })
    }
  },
  textInput: function(e){
    var content = e.detail.value;
    var cnt = parseInt(content.length);
    this.setData({
      len:cnt,
      txtvalue:content
    })
    console.log(cnt)
  },
  addfeedback: function(e){
    var that = this
    db.collection('feedback').add({
      data:{
        nickname:that.data.nickname,
        msg:that.data.txtvalue
      }
    }).then(res=>{
      that.openToast()
      that.setData({
        txtvalue:'',
        len:0
      })
      console.log(res)
    })

  },
  /**
   * 成功弹窗
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
  }
});