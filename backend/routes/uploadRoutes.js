const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { uploadFileToStorj } = require('../controllers/uploadController');

router.post('/upload',authenticateToken,uploadFileToStorj);

module.exports = router;
