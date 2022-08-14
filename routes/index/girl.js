const express = require('express')
const router = express.Router()
const db = require('../../db/index')
router.get('/',(req,res)=>{
    const sql = `select headPic,wx,signature,nickname,loveNum,id from userinfo where sex=? and headPic != "" and nickname != "" and headPic != "/upload/undefined"`
    
    db.query(sql,'girl',(err,results)=>{
        if(err) return res.cc(err)
        const sqlStr = `select nickname,headPic from userinfo where id = ${req.session.user.id}`
        db.query(sqlStr,(err,result)=>{
            res.render('girl.html',{
                results:results,
                nickname:result[0].nickname,
                headPic:result[0].headPic
            })
        })
        
    })
    
})

module.exports = router