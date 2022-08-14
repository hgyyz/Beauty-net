const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.send('后台')
})

module.exports = router