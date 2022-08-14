const express = require('express')

const router = express.Router()

const url = require('url')

//判断用户是否登录
router.use((req,res,next)=>{
    //清除路径后携带的参数
    const pathname = url.parse(req.url).pathname
    if(req.session.user){
        next()
    }else{
        if(pathname == '/login' || pathname == '/dologin' || pathname == '/captcha' || pathname == '/register'){
            next()
        }else{
            res.redirect('/index/login')
        }
    }
})

//引入路由模板
const signup = require('../schema/user')
const captcha = require('./index/captcha')
const dologin = require('./index/dologin')
const register = require('./index/register')
const userinfo = require('./index/userinfo')
const index = require('./index/index')
const login = require('./index/login')
const outlogin = require('./index/outlogin')
const girl = require('./index/girl')
const num = require('./index/num')
const boy = require('./index/boy')
const lot = require('./index/lot')
const dolot = require('./index/dolot')
const douserinfo = require('./index/douserinfo')
//使用路由
router.use('/captcha',captcha)
router.use('/dologin',signup.login,dologin)
router.use('/register',signup.register,register)
router.use('/userinfo',userinfo)
router.use('/index',index)
router.use('/login',login)
router.use('/outlogin',outlogin)
router.use('/girl',girl)
router.use('/num',num)
router.use('/boy',boy)
router.use('/lot',lot)
router.use('/dolot',dolot)
router.use('/douserinfo',douserinfo)

module.exports = router
