var express = require('express');
var router = express.Router();

const conversationController = require('../src/controller/conversation');
const topic = require('../src/controller/topic');

/* GET home page. */
router.get('/', conversationController.start);
router.get('/topics/drivers/:driver_id/passengers/:passenger_id', topic.getMatchedTopics);
router.get('/conversation/start/drivers/:driver_id/passengers/:passenger_id/topics/:chosen_topic', conversationController.start)

module.exports = router;
