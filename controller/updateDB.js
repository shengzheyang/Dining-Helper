const polling = require('../models/polling.js');
const stateOptions2dbOptions = require('./stateOptions2dbOptions.js');

const comparer = (otherArray) =>{
  return function(current){
    return otherArray.filter(function(other){
      return other.content == current.content
    }).length == 0;
  }
}

const updateDB = (userId, pollingId, oldPolling, newPolling) => {
  var oldBasicInfo = oldPolling.basicInfo;
  var newBasicInfo = newPolling.basicInfo;
  var oldOptions = oldPolling.options;
  var newOptions = newPolling.options;
  if(oldBasicInfo.subject !== newBasicInfo.subject)
    polling.changeSubject(userId, pollingId, newBasicInfo.subject);
  if(oldBasicInfo.pollingEndTime !== newBasicInfo.pollingEndTime)
    polling.changePollingEndTime(userId, pollingId, newBasicInfo.pollingEndTime);
  if(oldBasicInfo.availableTimeFrom === undefined && oldBasicInfo.availableTimeTo === undefined && oldBasicInfo.startPoint === undefined){
    polling.addUsersInfo(pollingId, [{
      userId: userId,
      availableTimeFrom: newBasicInfo.availableTimeFrom,
      availableTimeTo:newBasicInfo.availableTimeTo,
      startPoint: newBasicInfo.startPoint
    }]);
  } else {
    if(oldBasicInfo.availableTimeFrom !== newBasicInfo.availableTimeFrom || oldBasicInfo.availableTimeTo !== newBasicInfo.availableTimeTo)
      polling.changeAvaliableTimes(pollingId, [userId], [newBasicInfo.availableTimeFrom], [newBasicInfo.availableTimeTo]);
    if(oldBasicInfo.startPoint !== newBasicInfo.startPoint) {
       console.log('start point change');
        polling.changeStartPoints(pollingId, [userId], [newBasicInfo.startPoint]);
    }
  }
  updateDBOptions(userId, pollingId, oldOptions, newOptions);
}

const updateDBOptions = (userId, pollingId, oldOptions, newOptions) => {
  //get difference
  var onlyInDB = oldOptions.filter(comparer(newOptions));
  var onlyInFront = newOptions.filter(comparer(oldOptions));

  polling.deleteOptions(pollingId, onlyInDB.map(item => item.content));
  var dbOptions = stateOptions2dbOptions(onlyInFront, userId)
  polling.addOptions(pollingId, dbOptions)
  .then(polling.voteOptions(userId, pollingId, onlyInFront.map(item => item.content)));

  var contentsToVote = [];
  var contentsToRevokeVote = [];
  //vote or revokeVote
  oldOptions.map(function(item1){
    newOptions.map(function(item2){
      if(item1.content === item2.content){
        if(item2.isVoted && !item1.isVoted)
          contentsToVote.push(item1.content);
        if(!item2.isVoted && item1.isVoted)
          contentsToRevokeVote.push(item1.content);
      }
    })
   })
  polling.voteOptions(userId, pollingId, contentsToVote);
  polling.revokeVote(userId, pollingId, contentsToRevokeVote);
}

module.exports = updateDB;
