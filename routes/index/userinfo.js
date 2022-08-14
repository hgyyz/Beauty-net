const express = require('express')
const router = express.Router()
const path = require('path')
const tools = require('../../model/tools')
//导入数据库操作模块
const db = require('../../db/index')
router.get('/',(req,res)=>{
    const sqlStr = 'select * from userinfo where id=?'
    db.query(sqlStr,req.session.user.id,(err,results)=>{
        if(err) return res.cc('执行SQL语句失败')
        res.render('userinfo.html',{
                headPic:results[0].headPic,
                nickname:results[0].nickname,
                wx:results[0].wx,
                hobby:results[0].hobby,
                qq:results[0].qq,
                city:results[0].city,
                age:results[0]. age,
                character:results[0].character,
                signature:results[0].signature,
                constellation:results[0].constellation,
                like:results[0].like,
                school:results[0].school,
                phone:results[0].phone,
                occupation:results[0].occupation,
                major:results[0].major,
                sex:req.session.user.sex
        }) 
    })
})
router.get('/reuserinfo',(req,res)=>{
    const sqlStr = 'select * from userinfo where id=?'
    
    db.query(sqlStr,req.session.user.id,(err,results)=>{
        if(err) return res.cc('执行SQL语句失败')
        
        res.render('reuserinfo.html',{
                headPic:results[0].headPic,
                nickname:results[0].nickname,
                wx:results[0].wx,
                hobby:results[0].hobby,
                qq:results[0].qq,
                city:results[0].city,
                age:results[0]. age,
                character:results[0].character,
                signature:results[0].signature,
                constellation:results[0].constellation,
                like:results[0].like,
                school:results[0].school,
                phone:results[0].phone,
                occupation:results[0].occupation,
                major:results[0].major,
                sex:req.session.user.sex
        }) 
    })
})


module.exports = router