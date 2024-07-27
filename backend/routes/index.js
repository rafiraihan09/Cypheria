var express = require('express');
var router = express.Router();

const conversationController = require('../src/controller/conversation');
const topic = require('../src/controller/topic');

/* GET home page. */
router.get('/', conversationController.start);
router.get('/topics/drivers/:driver_id/passengers/:passenger_id', topic.getMatchedTopics);

module.exports = router;
