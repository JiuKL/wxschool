// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var bgn = (event.page-1)*event.len
  try{
    return await db.collection('s_msg').skip(bgn).limit(event.len).get()
  }catch(e){
    console.error(e)
  }
}