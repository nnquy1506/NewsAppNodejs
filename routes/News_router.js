const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const news_controller = require('../controllers/News_controller');
const { validator, result, validateFile } = require('../middleware/validator');
// a simple test url to check that all of our files are communicating correctly.
router.get('/news', news_controller.getAllNews);
router.post('/create', news_controller.news_create);
router.get('/single/:id', news_controller.news_details);
router.put('/:id/update', news_controller.news_update);
router.delete('/:id/delete', news_controller.news_delete);
router.get('/news/:category/:qty?', news_controller.getNewsByCategory);
router.post('/news/search/:query', news_controller.searchPosts);
module.exports = router;