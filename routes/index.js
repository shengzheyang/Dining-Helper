// ===== MODULES ===============================================================
var express = require("express");

const router = express.Router();
const getUserViewedPollingFromPolling = require("../controller/userViewedPolling.js");
const polling = require("../models/polling.js");
const stateOptions2dbOptions = require("../controller/stateOptions2dbOptions.js");
const updateDB = require("../controller/updateDB.js");
const getAnalysedResult = require("../controller/resultAnalyser.js");
const { callSendAPI } = require("../callSendAPI.js");

// GET home page
router.get("/", (_, res) => {
  res.render("./index", {
    demo: false,
    listId: "1"
  });
});

router.route("/addPolling").post((req, res) => {
  // receive userViewedPolling from the frontend (basicInfo, options)
  const basicInfo = req.body.basicInfo;
  const options = req.body.options;
  console.log(basicInfo);
  console.log(options);

  var userId = req.body.userId;
  var dbOptions = stateOptions2dbOptions(options, userId);

  var contents = [];
  options.map(option => {
    if (option.isVoted) {
      contents.push(option.content);
      console.log("content:", option.content);
    }
  });

  const relatedUsersInfo = [
    {
      userId: userId,
      availableTimeFrom: basicInfo.availableTimeFrom,
      availableTimeTo: basicInfo.availableTimeTo,
      startPoint: basicInfo.startPoint
    }
  ];
  polling
    .startPolling(
      userId,
      basicInfo.subject,
      basicInfo.pollingEndTime,
      0,
      1,
      dbOptions,
      relatedUsersInfo
    )
    .then(pollingId => {
      polling.voteOptions(userId, pollingId, contents);
      console.log("pollingid is set to" + `${pollingId}`);
      res.json(pollingId);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/getPollingById").post((req, res) => {
  getUserViewedPollingFromPolling(req.body.pollingId, req.body.userId)
    .then(polling => {
      console.log(polling);
      res.json(polling);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

/*
// Section: sending message to user
*/

const shareListMessage = (apiUri, listId, title, subtitle, buttonText) => {
  const urlToList = apiUri + `/${listId}`;
  console.log({ urlToList });
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: title,
            image_url: `${apiUri}/assets/icon-dh.png`,
            subtitle: subtitle,
            default_action: {
              type: "web_url",
              url: urlToList,
              messenger_extensions: true
            },
            buttons: [openExistingListButton(urlToList, buttonText)]
          }
        ]
      }
    }
  };
};

const openExistingListButton = (listUrl, buttonText = "Edit List") => {
  return {
    type: "web_url",
    title: buttonText,
    url: listUrl,
    messenger_extensions: true,
    webview_height_ratio: "tall"
  };
};

router.route("/sendMessageToUser").post((req, res) => {
  console.log("This is req.body, " + JSON.stringify(req.body));
  var pollId = req.body.pollingId;
  var senderId = req.body.senderId;
  var isOwner = req.body.isOwner;
  var subject = req.body.subject;

  let apiUri = "https://dining-helper.herokuapp.com/basicInfoPage";
  var messageData = {};
  if (isOwner === true) {
    messageData = shareListMessage(
      apiUri,
      pollId,
      subject,
      "Share plan with your friends",
      "Share"
    );
  } else {
    messageData = shareListMessage(
      apiUri,
      pollId,
      subject,
      "Add your options to the plan",
      "Open"
    );
  }

  var msg = {
    recipient: {
      id: senderId
    },
    message: messageData
  };

  callSendAPI(msg);
  var okmsg = "ok";
  res.json(okmsg);
});

//End Section

router.route("/updatePollingIfChanged").post((req, res) => {
  updateDB(
    req.body.userId,
    req.body.pollingId,
    req.body.oldPolling,
    req.body.newPolling
  );
});

router.route("/getAnalysedResult").post((req, res) => {
  getAnalysedResult(req.body.pollingId)
    .then(result => res.json(result))
    .catch(err => res.status(300).json("Error: " + err));
});

module.exports = router;
