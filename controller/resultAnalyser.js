const polling = require('../models/polling.js');
<<<<<<< HEAD


const getTotalDistance = (usersStartPoints, endPoint) => {
  
}


const getAnalysedResult = (pollingId) => {
=======
const axios = require('axios');

const getTotalDistance = async (usersStartPoints, endPoint) => {
  var totalDis = 0, maxTime = 0;
  var queryString = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='
  + usersStartPoints.map(startPoint => startPoint).join('|') + '&destinations=' + endPoint
  + '&key=AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY'
  queryString = queryString.replace(/\s/g, '%20')
  // console.log("queryString: ", queryString)
  
  var res = await axios.get(queryString);
  // .then(res => {
  // console.log(res)
  res.data.rows.map(row => {
      // console.log('distance(m):', row.elements[0].distance.value);
      // console.log('duration(min):', row.elements[0].duration.value);
      totalDis += row.elements[0].distance.value
      // maxTime = Math.max(row.elements[0].duration.value, maxTime)
  });     
  // })
  // .catch(function (error) {
  //     console.log(error);
  // })

  return totalDis
}

const filterAvailability = (usersAvailableTimeFrom, usersAvailableTimeTo) => {
  // var from = usersAvailableTimeFrom[0], to = usersAvailableTimeTo[0], user_num = usersAvailableTimeFrom.size;
  // [1, 30] [2, 40]
  // from=1, to =2
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
>>>>>>> 8ba5574b971118bc4c387a70fd6ba0e88ae6aca6
  var onePolling = await polling.findOne({'_id': pollingId}).exec();
  var options = onePolling.options;
  var relatedUsersInfo = onePolling.relatedUsersInfo;
  var usersStartPoints = relatedUsersInfo.map((item) => item.startPoint);
  var usersAvailableTimeFrom = relatedUsersInfo.map((item) => item.availableTimeFrom);
  var usersAvailableTimeTo = relatedUsersInfo.map((item) => item.availableTimeTo);

<<<<<<< HEAD
  // rank according to vote
  options.sort((a,b) => {
    return -(a.votedUser.size - b.votedUser.size);
  });
  // rank according to distance
  const optionsWithTotalDistance = await Promise.all(options.map(async option => {
    var totalDistance = 0;
    await totalDistance = getTotalDistance(usersStartPoints, option.content);
=======
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
>>>>>>> 8ba5574b971118bc4c387a70fd6ba0e88ae6aca6
    return {
      content: option.content,
      totalDistance: totalDistance
    };
  }));

  optionsWithTotalDistance.sort((a,b) => {
<<<<<<< HEAD
    return a.totalDistance - b.totalDistance;
  })
  // use availableTime to filter result

}
=======
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

// getTotalDistance(["Carl's Jr., 18032 Culver Dr, Irvine, CA 92612, USA"],
// 'Park West Apartment Homes, 3883 Parkview Ln, Irvine, CA 92612, USA')
// .then((res) => console.log("Distances1", res))
// getTotalDistance(["Panda Express, 15333 Culver Dr 400, Irvine, CA 92604, USA"],
// 'Park West Apartment Homes, 3883 Parkview Ln, Irvine, CA 92612, USA')
// .then((res) => console.log("Distances2", res))
// getTotalDistance(["Kingfu Master, 18040 Culver Dr, Irvine, CA 92612, USA"],
// 'Park West Apartment Homes, 3883 Parkview Ln, Irvine, CA 92612, USA')
// .then((res) => console.log("Distances3", res))

// var res = filterAvailability([1, 10, 14], [12, 14, 15])
// console.log(res);

// getAnalysedResult("5de4991855b136ea483e4406")
// .then((res) => console.log("Analysed result: ", res));


// getAnalysedResult('5de4991855b136ea483e4406')
// .then( (res) => console.log(res));

module.exports = getAnalysedResult;
// module.exports.getTotalDistance = getTotalDistance;
// module.exports.filterAvailability = filterAvailability;
// module.exports.getAnalysedResult = getAnalysedResult;
>>>>>>> 8ba5574b971118bc4c387a70fd6ba0e88ae6aca6
