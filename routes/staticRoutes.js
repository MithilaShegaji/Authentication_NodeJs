const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const myController = require('../controller/myController');
router.get('/home',requireAuth,(req,res) => res.render('home'));


module.exports = router;