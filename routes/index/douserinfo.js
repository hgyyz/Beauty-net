const express = require('express')
const router = express.Router()
const path = require('path')
const tools = require('../../model/tools')
const db = require('../../db/index')
const signup = require('../../schema/user')

const joi = require('joi')

const schemaRegister = joi.object({
        nickname:joi.string().pattern(/^[\S]{2,4}$/).required().error(new Error('昵称格式错误(必选)')),
        wx:joi.string().pattern(/^[\S]{6,20}$/).required().allow('').error(new Error('微信格式错误(必选)')),
        hobby:joi.string().pattern(/^[\S]{0,10}$/).allow('').error(new Error('爱好不能超过十个字符')),
        qq:joi.string().pattern(/^[\S]{5,10}$/).allow('').error(new Error('QQ号的格式为5-10位')),
        city:joi.string().pattern(/^[\S]{0,8}$/).allow('').error(new Error('城市格式错误')),
        age:joi.number().min(0).max(120).allow('').error(new Error('年龄应为1-120之间')),
        character:joi.string().pattern(/^[\S]{0,8}$/).allow('').error(new Error('性格最多8个字符')),
        signature:joi.string().pattern(/^[\S]{0,15}$/).required().allow('').error(new Error('签名最多15个字符')),
        constellation:joi.string().pattern(/^[\S]{3,3}$/).allow('').error(new Error('星座为3个字符')),
        like:joi.string().pattern(/^[\S]{0,10}$/).allow('').error(new Error('喜欢类型最多十个字符')),
        school:joi.string().pattern(/^[\S]{0,12}$/).allow('').error(new Error('学校最多十二个字符')),
        phone:joi.string().pattern(/^[1][3,4,5,7,8,9][0-9]{9}$/).allow('').error(new Error('手机号格式错误')),
        occupation:joi.string().pattern(/^[\S]{0,8}$/).allow('').error(new Error('职业最多8个字符')),
        major:joi.string().pattern(/^[\S]{0,6}$/).allow('').error(new Error('学科最多6个字符')),
})

router.post('/',tools.multer().single('headPic'),(req,res)=>{
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body
    console.log(userinfo);
    if(schemaRegister.validate(req.body).error&&schemaRegister.validate(req.body).error.message){
        return  res.cc(schemaRegister.validate(req.body).error&&schemaRegister.validate(req.body).error.message)
    }
    const sqlStr = 'select * from userinfo where id=?'
    const sqlup = `update userinfo set ? where id = ${req.session.user.id}`
    db.query(sqlStr,req.session.user.id,(err,results)=>{
        if(err) return res.cc('执行SQL语句失败')
        if(results.length > 0){
            db.query(sqlup,{
                headPic:'\/upload\/'+req.session.filename,
                nickname:userinfo.nickname,
                wx:userinfo.wx,
                hobby:userinfo.hobby,
                qq:userinfo.qq,
                city:userinfo.city,
                age:userinfo.age,
                character:userinfo.character,
                signature:userinfo.signature,
                constellation:userinfo.constellation,
                like:userinfo.like,
                school:userinfo.school,
                phone:userinfo.phone,
                occupation:userinfo.occupation,
                major:userinfo.major
            },(err,results)=>{
                if(err) return res.cc(err)
                
                return res.send('修改成功')
            })
        }
    })
   
})

module.exports = router