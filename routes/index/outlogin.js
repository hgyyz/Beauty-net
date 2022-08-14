const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    req.session.user = null;
    res.redirect('/index/login')
})

module.exports = router