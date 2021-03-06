import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import { Label } from "../components/components";
import { TextInput } from "../components/components";
import { PlainText } from "../components/components";
import { OptionForm } from "../components/components";
import { Option } from "../components/components";

import * as submit_button from "../submit.png";
var util = require("util");

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.location.query.userId,
      pollingId: this.props.location.query.pollingId,
      basicInfo: this.props.location.query.basicInfo,
      options: this.props.location.query.options,
      socketpush: this.props.location.query.socketpush
    };
    this.setOptions = this.setOptions.bind(this);
    this.optionsPageClick = this.optionsPageClick.bind(this);
  }

  renderLabel(subject) {
    return <Label subject={subject} />;
  }

  renderTextInput(hint) {
    return <TextInput hint={hint} />;
  }

  renderPlainText(text) {
    return <PlainText text={text} />;
  }

  renderOptionForm() {
    return (
      <OptionForm
        socketpush={this.state.socketpush}
        pollingId={this.state.pollingId}
        basicInfo={this.state.basicInfo}
        options={this.state.options}
        setOptions={this.setOptions}
        history={this.props.history}
        location={this.props.location}
        userId={this.state.userId}
      />
    );
  }

  setOptions(options) {
    this.setState({ options: options });
  }

  optionsPageClick = () => {
    // const baseURL = "http://localhost:5000"; // local
    const baseURL = "https://dining-helper.herokuapp.com"; // heroku

    if (this.state.pollingId) {
      // get data from DB & compare data from DB and data about to submit
      // if changed, resubmit
      const param = {
        pollingId: this.state.pollingId,
        userId: this.state.userId
      };
      axios
        .post(baseURL + "/getPollingById", param)
        .then(res => {
          const changedParams = {
            userId: this.state.userId,
            pollingId: this.state.pollingId,
            oldPolling: res.data,
            newPolling: {
              basicInfo: this.state.basicInfo,
              options: this.state.options
            }
          };
          // re-submit
          axios
            .post(baseURL + "/updatePollingIfChanged", changedParams)
            .catch(err => {
              console.log(err);
            });
        })
        .then(() => {
          window.MessengerExtensions.requestCloseBrowser(null, null);
        });
    } else {
      const userViewedPolling = {
        userId: this.state.userId,
        basicInfo: this.state.basicInfo,
        options: this.state.options
      };

      axios
        .post(baseURL + "/addPolling", userViewedPolling)
        .then(res => {
          this.setState({ pollingId: res.data });
          const message = {
            pollingId: res.data,
            senderId: this.state.userId,
            isOwner: this.state.basicInfo.isOwner,
            subject: this.state.basicInfo.subject
          };
          this.state.socketpush(message);
        })
        .catch(err => console.log("error is ", err));
      // go back to FB views
      // window.MessengerExtensions.requestCloseBrowser(null, null);
    }
  };

  render() {
    var basicInfo = this.state.basicInfo;
    var options = this.state.options;
    return (
      <div style={{ position: "relative" }}>
        <Scrollbars autoHide style={{ height: "89vh" }}>
          <div class="element">
            <div class="label">{this.renderLabel("Subject")}</div>
            {this.renderPlainText(basicInfo.subject)}
          </div>
          <div class="element">
            <div class="label">{this.renderLabel("Polling End Time")}</div>
            {this.renderPlainText(
              new Date(basicInfo.pollingEndTime).toLocaleString()
            )}
          </div>
          <div class="element">
            <div class="label">{this.renderLabel("Options")}</div>
            {this.renderOptionForm()}
          </div>
        </Scrollbars>
        <div class="bottom">
          <button
            onClick={this.optionsPageClick}
            style={{
              outline: "none",
              padding: "0px",
              border: "none",
              width: "97%",
              height: "90%"
            }}
          >
            <img
              src={submit_button}
              alt="submit"
              style={{ width: "100%", height: "100%" }}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default OptionsPage;
