var express = require('express');
var router = express.Router();

const conversationController = require('../src/controller/conversation')

/* GET home page. */
router.get('/', conversationController.start);

module.exports = router;
