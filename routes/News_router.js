const express = require('express');
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
const news_controller = require('../controllers/News_controller');
// a simple test url to check that all of our files are communicating correctly.
router.get('/news', news_controller.getAllNews);
router.post('/create', news_controller.news_create);
router.get('/single/:id', news_controller.news_details);
router.get('/news/:category/:qty?', news_controller.getNewsByCategory);
router.post('/news/search/:query', news_controller.searchPosts);
router.get('/', (req,res) =>{
    res.render('layouts/mainLayout',{
        viewTitle: "Thêm tin tức"
    })
})
module.exports = router;