import React from "react";
import ReactDOM from "react-dom";
import BasicInfoPage from "./pages/basicInfoPage";
import OptionsPage from "./pages/optionsPage";
import MapPage from "./pages/mapPage";
import finalResultPage from "./pages/finalResultPage";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { func } from "prop-types";
import axios from "axios";

window.attachApp = (viewerId, threadType) => {
  const apiUri = `https://${window.location.hostname}`;
  let app;
  console.log(apiUri, threadType, viewerId);
  app = <App viewerId={viewerId} />;
  ReactDOM.render(app, document.getElementById("content"));
};

class App extends React.Component {
  socketpush = param => {
    
    if (param.isOwner === true) {
      // axios
        .post("https://dining-helper.herokuapp.com/sendMessageToUser", param)
        // axios.post('http://localhost:5000/sendMessageToUser', param)
        .then(res => {
          window.MessengerExtensions.requestCloseBrowser(null, null);
        })
        .catch(err => {
          console.log("app error is, " + err);
        });
    } else {
      window.MessengerExtensions.requestCloseBrowser(null, null);
    }
    console.log("this is the socket function");
  };

  constructor(props) {
    super(props);
    this.socketpush = this.socketpush.bind(this);
    this.state = {
      userId: this.props.viewerId
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/basicInfoPage" />}
          />
          <Route
            path="/optionsPage"
            render={props => <OptionsPage {...props} />}
          />
          <Route path="/mapPage" render={props => <MapPage {...props} />} />
          <Route
            path="/basicInfoPage/:pollingId?"
            render={props => (
              <BasicInfoPage
                {...props}
                userId={this.state.userId}
                socketpush={this.socketpush}
              />
            )}
          />
          <Route path="/finalResultPage" component={finalResultPage} />
        </div>
      </Router>
    );
  }
}
