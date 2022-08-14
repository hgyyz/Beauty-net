//导入表单验证包
const { required } = require('joi');
const joi = require('joi')
//表单验证模块
module.exports = {
  async register (req, res, next) {
    const schema = joi.object({
        username:joi.string().alphanum().min(1).max(10).required().error(new Error('请换一个用户名')),
        email:joi.string().email().required().error(new Error('邮箱格式错误')),
        sex:joi.string().required().error(new Error('请勾选性别')),
        password:joi.string().pattern(/^[\S]{6,12}$/).required().error(new Error('密码格式错误')),
        repassword:joi.ref('password')
    })  
    try {
        const value = await schema.validateAsync(req.body);
    }
    catch (err) {
        return res.send(err.message)
     }
     next()
  },
  async login (req, res, next) {
    const schema = joi.object({
        username:joi.string().alphanum().min(1).max(10).required().error(new Error('请换一个用户名')),
        password:joi.string().pattern(/^[\S]{6,12}$/).required().error(new Error('密码格式错误')),
        verify:joi.string().pattern(/^[\S]{4,4}$/).required().error(new Error('验证码格式错误')),
    })  
    try {
        const value = await schema.validateAsync(req.body);
    }
    catch (err) {
        return res.send(err.message)
     }
     next()
  },
}