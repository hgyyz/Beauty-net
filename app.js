//引入 express
const express = require('express')
//实例化 express
const app = express()
const cors = require('cors')
const db = require('./db/index')
app.use(cors())
//引入外部模块
const index = require('./routes/index')
const admin = require('./routes/admin')
const api = require('./routes/api')

app.use(express.static('public'))

//配置解析表单数据的中间件,注意：这个中间件，只能解析application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({ extended:false }))

//一定要在路由之前，封装res.cc函数
app.use((req,res,next)=>{
    res.cc = function(err,status=1){
        //status 默认值为1，表示失败的情况
        //err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
        res.send({
            status,
            message:err instanceof Error ? err.message : err,
        })
    }
    next()
})

const session = require('express-session')

app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',//服务端生成 session 的签名
  resave: false,//强制保存 session 即使它没有变化
  saveUninitialized: true,//强制将未初始化的 session 存储
  cookie: { 
      maxAge:1000*60*60,
      secure: false //true 表示只有 https 协议才能访问cookie
    }
}))

//引入 ejs
const ejs = require('ejs')
//配置模板引擎
app.engine("html",ejs.__express)
app.set("view engine","html")

app.use('/index',index)
app.use('/admin',admin)
app.use('/api',api)
//定时器，指定时间更新点赞数
setInterval(function(){
    const date = new Date()
    if(date.getHours()==23){
        const sql = `update userinfo set lockNum = 5`
        db.query(sql)
        console.log(123);
    }
},3600000)
//配置静态 web 目录
app.listen(3000,(req,res)=>{
    console.log('服务器已启动:http://127.0.0.1:3000/index/login');
})