


// ===== MODULES ===============================================================
var express = require('express');

const router = express.Router();
const getUserViewedPollingFromPolling = require('../controller/userViewedPolling.js');
const polling = require('../models/polling.js');
const stateOptions2dbOptions = require('../controller/stateOptions2dbOptions.js');
const updateDB = require('../controller/updateDB.js');

// GET home page
router.get('/', (_, res) => {
  res.render('./index', {
    demo: process.env.DEMO,
    listId: null,
  });
});

router.route('/addPolling').post((req, res) => {
  // receive userViewedPolling from the frontend (basicInfo, options)
  const basicInfo = req.body.basicInfo;
  const options = req.body.options;
  console.log(basicInfo);
  console.log(options);

<<<<<<< HEAD
  var userId = "myUserId"
  var dbOptions = stateOptions2dbOptions(options, userId)
=======

  var dbOptions = stateOptions2dbOptions(options, 'myUserId')
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
  var contents = [];
  options.map(option => {
    if (option.isVoted) {
      contents.push(option.content);
      console.log("content:", option.content)
    }
  })

  const relatedUsersInfo = [{
    userId: userId,
    availableTimeFrom: basicInfo.availableTimeFrom,
    availableTimeTo:basicInfo.availableTimeTo,
    startPoint: basicInfo.startPoint
  }]
  pollingId = polling.startPolling(userId, basicInfo.subject, basicInfo.pollingEndTime, 0, 1, dbOptions, relatedUsersInfo)
  .then((pollingId) => {polling.voteOptions(userId, pollingId, contents)})
  .then(() => res.json('Polling started!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getPollingById').post((req, res) => {
  getUserViewedPollingFromPolling(req.body.pollingId, req.body.userId)
  .then(polling => res.json(polling))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updatePollingIfChanged').post((req, res) => {
  updateDB(req.body.userId, req.body.pollingId, req.body.oldPolling, req.body.newPolling);
});

module.exports = router;
