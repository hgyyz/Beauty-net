const express = require('express')
const router = express.Router()
const db = require('../../db/index')
const lock = true
router.post('/',(req,res)=>{
    const sqlStr = `select lockNum from userinfo where id = ${req.session.user.id}`
    db.query(sqlStr,(err,results)=>{
        console.log(results[0].lockNum);
        if(results[0].lockNum > 0){
            console.log('添加成功');
            console.log(req.session.user.id);
            const sql = `update userinfo set lockNum = lockNum -1 where id = ${req.session.user.id}`
            db.query(sql)
            //将数据库的数字加一
            const sqlAdd = `update userinfo set loveNum =loveNum +1 where id = ${req.body.id}`
    
            db.query(sqlAdd,(err,results)=>{
                //拿到数据库的数字并发送给客户端
                const sqlSel = 'select loveNum from userinfo where id = ?'
                db.query(sqlSel,req.body.id,(err,results)=>{
                    res.send({
                        number:results[0].loveNum,
                    })
                })
            })
        }else{
            console.log('添加失败');
        }
    })
    
})

module.exports = router