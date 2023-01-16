const  express = require('express')
const router= express.Router();
const BlogController =require("../controllers/blog.controller")



router.post('/create-post',BlogController.createPost)




module.exports = router