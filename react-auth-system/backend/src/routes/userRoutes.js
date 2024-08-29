const express = require('express');
const { signUp, login, getUserData } = require('../controllers/userControllers');
const authenticateToken = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/userdata',authenticateToken, getUserData);

module.exports = router;
