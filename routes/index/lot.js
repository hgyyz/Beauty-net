const express = require('express')
const router = express.Router()
const db = require('../../db/index')
router.get('/',(req,res)=>{
    const sqlStr = `select nickname,headPic from userinfo where id = ${req.session.user.id}`
    db.query(sqlStr,(err,result)=>{
        res.render('lot.html',{
            nickname:result[0].nickname,
            headPic:result[0].headPic
        })
    })
    
})
    

module.exports = router