<<<<<<< HEAD
// stateOption: {
//     content: this.props.content,
//     isCreator: this.props.isCreator,
//     isVoted: this.props.isVoted,
//   }

//  dboptions: [{votedUser:[...user]}, _id, content]

const stateOptions2dbOptions = (options, myUserId) => {
  var dbOptions = [];

  options.map(option => {
    var dbOption = {
      votedUser: [],
      content: option.content,
      creator: ''
    }

    if (option.isVoted) {
      dbOption.votedUser.push(myUserId);
    }
    if (option.isCreator) {
      dbOption.creator = myUserId;
    }
    
    dbOptions.push(dbOption)
  });

  return dbOptions
}

=======
// stateOption: {
//     content: this.props.content,
//     isCreator: this.props.isCreator,
//     isVoted: this.props.isVoted,
//   }

//  dboptions: [{votedUser:[...user]}, _id, content]

const stateOptions2dbOptions = (options, myUserId) => {
  var dbOptions = [];

  options.map(option => {
    var dbOption = {
      votedUser: [],
      content: option.content,
      creator: ''
    }

    if (option.isVoted) {
      dbOption.votedUser.push(myUserId);
    }
    if (option.isCreator) {
      dbOption.creator = myUserId;
    }
    
    dbOptions.push(dbOption)
  });

  return dbOptions
}

>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
module.exports = stateOptions2dbOptions;