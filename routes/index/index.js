const express = require('express')
const router = express.Router()
const db = require('../../db/index')
router.get('/',(req,res)=>{
    const sql = 'select nickname,signature from userinfo where nickname != "" and headPic !="" and signature != ""  and headPic != "/upload/undefined" order by loveNum desc '
    db.query(sql,(err,results)=>{
        if(err) return res.cc(err)
        const sqlStr = `select nickname,headPic from userinfo where id = ${req.session.user.id}`
        db.query(sqlStr,(err,result)=>{
            res.render('index.html',{
                results:results,
                nickname:result[0].nickname,
                headPic:result[0].headPic
            })
        })
        
    })
    
    
})

module.exports = router