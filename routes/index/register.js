const express = require('express')
const router = express.Router()
//导入数据库操作模块
const db = require('../../db/index')
//导入 bcryptjs 包
const bcrypt = require('bcryptjs')
router.post('/',(req,res)=>{
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body
    
    //定义SQL语句，查询用户名是否被占用
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err){
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if(results.length > 0){
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        //调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        //定义插入用户的SQL语句
        const sql = 'insert into users set ?'
        
        //调用db.query()执行SQL语句，插入新用户
        db.query(sql,{username:userinfo.username,password:userinfo.password,email:userinfo.email,sex:userinfo.sex},function(err,results){
            //执行SQL语句失败
            if(err) return res.cc(err)
            //SQL 语句执行成功，但影响行数不为1
            if(results.affectedRows !== 1){
                return res.cc('注册用户失败，请稍后再试！')
            }
            // const sqlStr = 'insert into userinfo set ?'
            // db.query(sqlStr,{
            //     nickname:userinfo.username
            // },(err)=>{
            //     return res.cc('失败')
            // })
            //注册成功
            res.send('注册成功')
        })
    }) 
})

module.exports = router