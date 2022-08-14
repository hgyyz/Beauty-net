const express = require('express')
const router = express.Router()
//导入 bcryptjs 包
const bcrypt = require('bcryptjs')
const db = require('../../db/index')

router.post('/',(req,res)=>{
    //接收表单的数据
    const userinfo = req.body
    const verify = userinfo.verify

    if(verify.toLocaleLowerCase() !== req.session.captcha.toLocaleLowerCase()){
        return res.cc('验证码错误')
    }
    //定义SQL语句
    const sql = 'select * from users where username=?'
    
    //执行SQL语句，根据用户名查询用户的信息
    db.query(sql,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err) return res.cc(err)
        //执行SQL语句成功，但是获取到的数据条数不等于1
        if(results.length !== 1) return res.cc('登录失败')
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult) return res.cc('登录失败！')
        //在服务器生成session的字符串
        const user = {...results[0],password:'',pic:''}
        
        req.session.user = user
        //初始化userinfo的数据
        const sqlStr = 'select * from userinfo where id=?'
        db.query(sqlStr,req.session.user.id,(err,result)=>{
        if(result.length < 1){
                const sql = 'insert into userinfo set ? '
                db.query(sql,{
                    id:req.session.user.id,
                    headPic:null,
                    nickname:null,
                    wx:null,
                    hobby:null,
                    qq:null,
                    city:null,
                    age:null,
                    character:null,
                    signature:null,
                    constellation:null,
                    like:null,
                    school:null,
                    phone:null,
                    occupation:null,
                    major:null,
                    sex:req.session.user.sex,
                    loveNum:0
                })
            }
        })
        res.redirect('/index/index')
    })
})
 
module.exports = router