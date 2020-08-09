// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'msgid'
})
const db = wx.cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('feedback').add({
      data:{
        msg:event.msg,
        nickname:event.nickname
      }
    })
  }catch(e){
    console.error(e)
  }
}