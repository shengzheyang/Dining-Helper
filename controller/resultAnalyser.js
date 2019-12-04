const polling = require('../models/polling.js');


const getTotalDistance = (usersStartPoints, endPoint) => {
  
}


const getAnalysedResult = (pollingId) => {
  var onePolling = await polling.findOne({'_id': pollingId}).exec();
  var options = onePolling.options;
  var relatedUsersInfo = onePolling.relatedUsersInfo;
  var usersStartPoints = relatedUsersInfo.map((item) => item.startPoint);
  var usersAvailableTimeFrom = relatedUsersInfo.map((item) => item.availableTimeFrom);
  var usersAvailableTimeTo = relatedUsersInfo.map((item) => item.availableTimeTo);

  // rank according to vote
  options.sort((a,b) => {
    return -(a.votedUser.size - b.votedUser.size);
  });
  // rank according to distance
  const optionsWithTotalDistance = await Promise.all(options.map(async option => {
    var totalDistance = 0;
    await totalDistance = getTotalDistance(usersStartPoints, option.content);
    return {
      content: option.content,
      totalDistance: totalDistance
    };
  }));

  optionsWithTotalDistance.sort((a,b) => {
    return a.totalDistance - b.totalDistance;
  })
  // use availableTime to filter result

}
