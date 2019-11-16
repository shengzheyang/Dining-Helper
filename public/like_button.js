'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { liked: false };
	}


  render() {
    return (<h1>Hello World</h1>);
  }
}

ReactDOM.render(e(LikeButton), document.getElementById("main"));