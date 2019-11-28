const polling = require('../models/polling');

const getUserViewedPollingFromPolling = async (pollingId, userId) => {
  var onePolling = await polling.findOne({'_id': pollingId}).exec();
  var userViewedPolling = {
    basicInfo:{
      isOwner: undefined,
      subject: onePolling.subject,
      pollingEndTime: onePolling.pollingEndTime,
      availableTimeFrom: undefined,
      availableTimeTo: undefined,
      startPoint: undefined
    },
    options: [],
  }

  if(onePolling.creator === userId) {
    userViewedPolling.basicInfo.isOwner = true;
  }

  for(i in onePolling.relatedUsersInfo) {
    var userInfo = onePolling.relatedUsersInfo[i];
    if(userInfo.userId === userId) {
      userViewedPolling.basicInfo.availableTimeFrom = userInfo.availableTimeFrom;
      userViewedPolling.basicInfo.availableTimeTo = userInfo.availableTimeTo;
      userViewedPolling.basicInfo.startPoint = userInfo.startPoint;
    }
  }

  for( i in onePolling.options) {
    var optionFromPolling = onePolling.options[i];
    let option = {
      content: optionFromPolling.content,
      isCreator: undefined,
      isVoted: undefined
    }

    if(optionFromPolling.creator === userId){
      option.isCreator = true;
    } else {
      option.isCreator = false;
    }

    if(optionFromPolling.votedUser!=undefined && optionFromPolling.votedUser.includes(userId)) {
      option.isVoted = true;
    } else {
      option.isVoted = false;
    }
    userViewedPolling.options.push(option);
  }

  return userViewedPolling;
}

module.exports = getUserViewedPollingFromPolling;
