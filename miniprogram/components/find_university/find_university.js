// components/find_university/find_university.js
var appInst =  getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    },
    score: {
      type: Number,
      value: ''
    },
    level: {
      type: Array,
      value: []
    },
    location:{
      type:Number,
      value:''
    },
    flag:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userScore:'',
    userLocation:''
  },
  /**
   * 组件生命周期函数
  */
  lifetimes:{
    created: function(){
      
    },
    attached: function() {
      // 在组件实例进入页面节点树时执行a
      this.setData({
        userScore : appInst.userData.score,
        userLocation: appInst.userData.location
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
