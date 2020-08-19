import * as echarts from '../../components/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '红色区域不应被裁剪',
      left: 'center',
      textStyle :{
        fontWeight:'bolder',
        fontSize:20
      }
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['高校成绩', '我的成绩'],
      top: 50,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true,
      bottom:'20%'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      nameTextStyle :{
        fontSize:5
      },
      data: ['北京大学', '南京财经大学', '桂林理工大学', '江南大学', '天津大学', '天津工业大学', '南开大学','河北工业大学','东南大学','河海大学','南京大学','南京理工大学','苏州大学'],
      axisLabel: {  
        interval: 0,  
        formatter:function(value)  
        {  
            return value.split("").join("\n");  
        }  
      }
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      min: function (value) {
        return value.min-20;
    }
      // show: false
    },
    series: [{
      name: '高校成绩',
      type: 'line',
      smooth: true,
      data: [680, 533, 598, 466, 650, 538, 592, 659, 647, 595, 667, 604, 609]
    },
    {
      name: '我的成绩',
      type: 'line',
      smooth: true,
      data: [665, 665, 665, 665, 665, 665, 665, 665, 665, 665, 665, 665, 665]
    }]  
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
