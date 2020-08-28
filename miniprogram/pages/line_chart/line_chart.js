import * as echarts from '../../components/ec-canvas/echarts'
const app = getApp();
var school_list = []
var school_grade_list = []
var school_location_list = []
var user_score_list = []
var user_location_list = []
function getGradeOption() {
  return {
    title: {
      text: '分数线图表',
      left: 'center',
      textStyle: {
        fontWeight: 'bolder',
        fontSize: 20
      }
    },
    color: ["#37A2DA", "#67E0E3",'#8e44ad'],
    legend: {
      data: ['最低录取成绩', '我的成绩'],
      top: 50,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true,
      bottom: '20%'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      nameTextStyle: {
        fontSize: 5
      },
      data: school_list,
      axisLabel: {
        interval: 0,
        formatter: function (value) {
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
        return value.min - 20;
      },
      max: function (value) {
        return value.max + 20;
      }
      // show: false
    },
    series: [{
      name: '最低录取成绩',
      type: 'line',
      smooth: true,
      data: school_grade_list
    },
    {
      name: '我的成绩',
      type: 'line',
      data: user_score_list
    }]
  };
}
function getLocationOption() {
  return {
    title: {
      text: '分数线图表',
      left: 'center',
      textStyle: {
        fontWeight: 'bolder',
        fontSize: 20
      }
    },
    color: ["#37A2DA", "#67E0E3",'#8e44ad'],
    legend: {
      data: ['最低录取位次', '我的位次'],
      top: 50,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true,
      bottom: '20%'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      nameTextStyle: {
        fontSize: 5
      },
      data: school_list,
      axisLabel: {
        interval: 0,
        formatter: function (value) {
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
        return value.min - 200;
      },
      max: function (value) {
        return value.max + 200;
      }
      // show: false
    },
    series: [{
      name: '最低录取位次',
      type: 'line',
      smooth: true,
      data: school_location_list
    },
    {
      name: '我的位次',
      type: 'line',
      data: user_location_list
    }]
  };
}
Page({
  data: {
    flag:0,
    grade: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getGradeOption());

        return barChart;
      }
    },
    location:{
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getLocationOption());

        return barChart;
      }
    }
  },
  onLoad: function (options){
    this.setData({
      flag: options.flag
    })
    school_list = []
    school_grade_list = []
    school_location_list = []
    user_score_list = []
    user_location_list = []

    school_list = JSON.parse(options.school_list)
    if(options.flag==0){
      school_grade_list = JSON.parse(options.school_grade_list)
      for (let i = 0; i < school_list.length; i++) {
        user_score_list.push(app.userData.score)
      }
    }else{
      school_location_list = JSON.parse(options.school_location_list)
      for (let i = 0; i < school_list.length; i++) {
        user_location_list.push(app.userData.location)
      }

    }
    
  },
  onReady() {
  }
});

