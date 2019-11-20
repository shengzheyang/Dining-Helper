const user = require('../models/user');
const polling = require('../models/polling');
const getUserViewedPollingFromPolling = require('../models/userViewedPolling');

const test = async () => {

  var date1 = new Date("2019-11-02T16:00:00Z");
  var date2 = new Date("2019-11-03T16:00:00Z");
  var date3 = new Date("2019-11-04T16:00:00Z");

  var option1 = {
    content: "Poke Me",
    creator: "123",
    votedUser: ["124"]
  };

  var option2 = {
    content: "Panda Express",
    creator: "123",
    votedUser: ["123"]
  };

  var option3 = {
    content: "Wendy's",
    creator: "123",
    votedUser: ["123","124", "125"]
  };

  var relatedUsersInfo1 = {
    userId: "123",
    availableTimeFrom: date1,
    availableTimeTo: date2,
    startPoint: "3701 ParkView Ln, Apt 17C, Irvine, CA 92612"
  }

  var relatedUsersInfo2 = {
    userId: "124",
    availableTimeFrom: date1,
    availableTimeTo: date2,
    startPoint: "3701 ParkView Ln, Apt 17C, Irvine, CA 92612"
  }

  /**
   *  check users operations
   */
   await user.addUser("124");
   await user.addUser("123");
   await user.addCreatedPollingsToUser(["4", "5", "6"], "123");
   await user.deleteCreatedPollingsToUser( ["6", "5"], "123");
   await user.addSharedPollingsToUser(["1", "2", "3"], "124");
   await user.deleteSharedPollingsToUser( ["3", "2"], "124");

   /**
    *  check polling operations
    */
   var pollingId1 = await polling.startPolling("124", "which restaurant to go for dinner?", date1, 1, 1, [option1]);
   await user.addSharedPollingsToUser([pollingId1], "123");
   await polling.deletePolling("124", pollingId1);

  /**
   *  check options operations
   */
  var pollingId = await polling.startPolling("123", "which restaurant to go for dinner?", date1, 1, 1, [option1]);
  await polling.addOptions(pollingId, [option2,option3]);
  await polling.updateOptions(pollingId, ["Wendy's"], ["Chich-fill-A"]);
  await polling.deleteOptions(pollingId, ["Panda Express"]);
  await polling.voteOptions("126", pollingId, ["Poke Me"]);
  await polling.revokeVote("126", pollingId, ["Poke Me"]);

  /**
   *  check relatedUsersInfo operations
   */
  await polling.addUsersInfo(pollingId, [relatedUsersInfo1, relatedUsersInfo2]);
  await polling.deleteUsersInfo(pollingId, ["124"]);
  await polling.changeAvaliableTimes(pollingId, ["123"], [date1], [date3]);
  await polling.changeStartPoints(pollingId, ["123"], ["UCI"]);

  var info = await getUserViewedPollingFromPolling(pollingId, "123");
  console.log(info);
}

test();
