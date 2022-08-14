const express = require('express')
const router = express.Router()
const db = require('../../db/index')
router.post('/',(req,res)=>{
    if(req.session.user.sex == 'girl'){
        const sql = 'select nickname from userinfo where sex=? and nickname != ""'
        db.query(sql,'boy',(err,results)=>{
            const name = (eval('('+JSON.stringify(results)+')'))
            const num = Math.floor((Math.random() * name.length));
            if(results.length < 1){
                res.send({
                    name:'暂无信息'
                })
            }else{
                res.send({
                    name:name[num].nickname
                })
            }
        })
    }else{
        const sql = 'select nickname from userinfo where sex=?'
        db.query(sql,'girl',(err,results)=>{
            const name = (eval('('+JSON.stringify(results)+')'))
            const num = Math.floor((Math.random() * name.length));
            if(results.length < 1){
                res.send({
                    name:'暂无信息'
                })
            }else{
                res.send({
                    name:name[num].nickname
                })
            }
        })
    }
    
})

module.exports = router