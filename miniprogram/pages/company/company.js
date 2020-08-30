// pages/province/province.js
import * as echarts from '../../components/ec-canvas/echarts'
var neednum = ['99', '972', '126', '41', '593', '402', '351', '6', '677', '4', '111', '267', '13', '4475', '1', '10415', '9', '18', '1568', '24', '38', '155', '15', '6', '14', '50', '483', '1', '56', '6', '532', '3035', '204', '3307', '187', '402', '56', '4', '153', '2368', '14', '111', '41', '1', '21', '1', '3307', '1', '172', '1482', '5108', '357', '483', '10', '9', '3262', '1', '10415', '465', '36', '13', '200', '111', '15994', '588', '175', '139', '20', '41', '402', '665', '3629', '311', '52', '85', '8', '402', '1825', '34', '8']

var company = ['小黑鱼', '爱奇艺', '国金黄金', '爱茂传媒', '厨芯', '京东商城', '花生好车', '小灵花科技', '北京摩拜科技有限公司', '妙计旅行', '环球易购', '中公教育集团', '明山控股', '软通动力', 'Liking健身', '宜信公司', '波巴布', '58到家', '博彦科技', '米雅科技', '玩具超人', '什么值得买', '果小美', '小灵花科技', '极课大数据', '洋钱罐', '中国人寿', '联想', '创业邦', '小灵花科技', '亿达信息', 'BOSS直聘', '金证股份', '好未来', '联想利泰', '京东商城', '创业邦', '妙计旅行', '美味不用等', '有赞', '极课大数据', '远行地产', '微链', 'Liking健身', '新橙科技', '联想', '好未来', '上海青客公寓', '微拍堂', '菜鸟网络', '百度', '优胜教育', '中国人寿', '纬创', '波巴布', '中软国际', 'Liking健身', '宜信公司', 'TutorABC', 'ASDC', '明山控股', '51Talk', '远行地产', '阿里巴巴集团', '珍爱网', '泥巴公社集团', '小站教育', '去哪儿', '爱茂传媒', '京东商城', '旷视MEGVII', '网易', '便利蜂', '随行付', '真有两把刷子', '农田管家', '京东商城', '小米', '安荣科技', '北京来为科技']

var jobtype = ['互联网', '互联网', '其他行业', '广告营销', '智能硬件', '电子商务', '汽车生产', '互联网金融', '互联网', '互联网', '电子商务', '互联网', '互联网金融', '计算机软件', '互联网', '互联网金融', '互联网金融', '互联网', '计算机软件', '移动互联网', '生活服务', '互联网', '互联网', '互联网金融', '互联网', '互联网', '互联网金融', '计算机软件', '移动互联网', '互联网金融', '计算机软件', '人力资源服务', '计算机软件', '互联网', '移动互联网', '电子商务', '移动互联网', '互联网', '互联网', '互联网', '互联网', '其他专业服务', '互联网', '互联网', '计算机软件', '计算机软件', '互联网', '互联网', '电子商务', '互联网', '互联网', '在线教育', '互联网金融', '计算机软件', '互联网金融', '计算机软件', '互联网', '互联网金融', '在线教育', '计算机软件', '互联网金融', '在线教育', '其他专业服务', '互联网', '社交网络', '工程施工', '在线教育', '互联网', '广告营销', '电子商务', '计算机服务', '移动互联网', '互联网', '互联网', '互联网', '移动互联网', '电子商务', '互联网', '计算机软件', '计算机软件']
var list_type = ['互联网', '在线教育', '计算机服务', '互联网金融', '计算机软件','移动互联网', '其他行业', '生活服务','工程施工']
var list_map = [{ 'name': '其他行业', 'value': 99 },
{ 'name': '互联网', 'value': 28188 },
{ 'name': '其他专业服务', 'value': 252 },
{ 'name': '广告营销', 'value': 82 },
{ 'name': '计算机软件', 'value': 7116 },
{ 'name': '生活服务', 'value': 402 },
{ 'name': '移动互联网', 'value': 2106 },
{ 'name': '人力资源服务', 'value': 6 },
{ 'name': '互联网金融', 'value': 7447 },
{ 'name': '电子商务', 'value': 24 },
{ 'name': '智能硬件', 'value': 111 },
{ 'name': '工程施工', 'value': 267 },
{ 'name': '社交网络', 'value': 13 },
{ 'name': '在线教育', 'value': 17900 },
{ 'name': '汽车生产', 'value': 1 },
{ 'name': '计算机服务', 'value': 10415 }]

var setTime = null
var index = 7
let barChart = null
let pieChart = null
var option = {
  title: {
    text: '企业热门招聘',
    subtext: '数据来源于BOSS直聘',
    left: 'center',
    textStyle: {
      fontWeight: 'bolder',
      fontSize: 20
    }
  },
  color: ["#e74c3c", '#8e44ad'],
  legend: {
    data: ['招聘人数'],
    top: 30,
    left: 'right',
    z: 100
  },
  grid: {
    containLabel: true,
    bottom: '5%'
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: (function() {
      var value = []
      var len = 0
      while (len < 8) {
        value.push(company[len++])
      }
      return value
    })(),
    axisLabel: {
      interval: 0,
      textStyle: {
        fontSize: 10      //更改坐标轴文字大小
      },
      formatter: function(value) {
        return value.split("").join("\n");
      }
    }
  },
  yAxis: {
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    min: 0,
    max: function(value) {
      return value.max + 20;
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 7      //更改坐标轴文字大小
      }
    },
  },
  series: [{
    name: '招聘人数',
    type: 'bar',
    data: (function() {
      var value = []
      var len = 0
      while (len < 8) {
        value.push(neednum[len++])
      }
      return value
    })()
  }]
};
var pie = {
  title: {
    text: '招聘专业占比',
    subtext: '数据来源于BOSS直聘',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    padding: [
      0,  // 上
      0, // 右
      20,  // 下
      0, // 左
    ],
    data: list_type
  },
  series: [
    {
      type: 'pie',
      radius: [60, 160],
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true
        }
      },
      center: ['50%', '50%'],
      roseType: 'area',
      data: (function(){
        for(let i = 0; i < list_map.length; i++){
          for(let j = 0; j < list_map.length-1-i; j++){
            if (list_map[j]['value']<list_map[j+1]['value']){
              var t = list_map[j]
              list_map[j] = list_map[j+1]
              list_map[j+1] = t
            }
          }
        }
        var value = []
        var list_name = []
        var orther = {'name':'其他行业','value':0}
        for (let i = 0; i < list_map.length; i++){
          if(i < 8){
            value.push(list_map[i])
          }else{
            orther['value'] += list_map[i]['value']
          }
        }
        value.push(orther)
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value.length - 1 - i; j++) {
            if (value[j]['value'] > value[j + 1]['value']) {
              var t = value[j]
              value[j] = value[j + 1]
              value[j + 1] = t
            }
          }
        }
        console.log(list_name)
        return value
      })()
    }
  ]
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chart:{
      onInit: function (canvas, width, height, dpr) {
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(option);

        return barChart;
      }
    },
    pie:{
      onInit: function (canvas, width, height, dpr) {
        pieChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(pieChart);
        pieChart.setOption(pie);

        return pieChart;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    setTime = setInterval(function() {
      var companys = option.xAxis.data
      var numbs = option.series[0].data
      if (index>=79){
        index = 1
      }else{
        index++
      }
      companys.shift()
      companys.push(company[index])
      numbs.shift()
      numbs.push(neednum[index])
      option.xAxis.data = companys
      option.series[0].data = numbs
      barChart.setOption(option);
      pieChart.setOption(pie)
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(setTime)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})