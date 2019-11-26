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

module.exports = stateOptions2dbOptions;