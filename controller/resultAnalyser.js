const polling = require('../models/polling.js');

const axios = require('axios');

const getTotalDistance = async (usersStartPoints, endPoint) => {
  var totalDis = 0, maxTime = 0;
  var queryString = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='
  + usersStartPoints.map(startPoint => startPoint).join('|') + '&destinations=' + endPoint
  + '&key=AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY'
  queryString = queryString.replace(/\s/g, '%20')

  var res = await axios.get(queryString);
  res.data.rows.map(row => {
      totalDis += row.elements[0].distance.value
  });

  return totalDis
}

const filterAvailability = (usersAvailableTimeFrom, usersAvailableTimeTo) => {
  from = Math.max(...usersAvailableTimeFrom);
  to = Math.min(...usersAvailableTimeTo);

  if (from > to) {
    return {
      filteredAvailableTimeFrom: -1,
      filteredAvailableTimeTo: -1
    };
  } else {
    return {
      filteredAvailableTimeFrom: from,
      filteredAvailableTimeTo: to
    };
  }

}

const getAnalysedResult = async (pollingId) => {
  var onePolling = await polling.findOne({'_id': pollingId}).exec();
  var options = onePolling.options;
  var relatedUsersInfo = onePolling.relatedUsersInfo;
  var usersStartPoints = relatedUsersInfo.map((item) => item.startPoint);
  var usersAvailableTimeFrom = relatedUsersInfo.map((item) => item.availableTimeFrom);
  var usersAvailableTimeTo = relatedUsersInfo.map((item) => item.availableTimeTo);

  // options_backup = [...options]
  rankedOptions = [...options];
  // rank according to vote
  rankedOptions.sort((a,b) => {
    return -(a.votedUser.length - b.votedUser.length);
  });
  var rankedOptionsContents = rankedOptions.map(option => option.content)

  // rank according to distance
  const optionsWithTotalDistance = await Promise.all(options.map(async option => {
    var totalDistance = 0;
    var totalDistance = await getTotalDistance(usersStartPoints, option.content);
    return {
      content: option.content,
      totalDistance: totalDistance
    };
  }));

  optionsWithTotalDistance.sort((a,b) => {
    return (parseInt(a.totalDistance, 10) - parseInt(b.totalDistance, 10));
  })
  var distRankedOptionsContents = optionsWithTotalDistance.map(option => option.content)

  // use availableTime to filter result
  const availablity = filterAvailability(usersAvailableTimeFrom, usersAvailableTimeTo)

  return {
    voteRank: rankedOptionsContents,
    distanceRank: distRankedOptionsContents,
    mutualAvailablity: availablity
  }
}

module.exports = getAnalysedResult;
