import React from "react";
import { Label } from "../components/components";
import { TextInput } from "../components/components";
import { SwitchToggle } from "../components/components";
import { PlainText } from "../components/components";
import { DateTimePicker } from "../components/components";
import { Scrollbars } from "react-custom-scrollbars";
import { UnmountClosed } from "react-collapse";
import { Result } from "../components/components";
import axios from "axios";

import * as continue_button from "../continue.png";
import * as map_button from "../map.png";

class BasicInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.initState();
    this.changeBasicInfo = this.changeBasicInfo.bind(this);
    this.changeResultOpen = this.changeResultOpen.bind(this);
  }

  initState() {
    var query = this.props.location.query;
    var params = this.props.match.params;
    // from mapPage to basicInfoPage
    if (query) {
      console.log("start point", query.basicInfo.startPoint);
      this.state = {
        userId: query.userId,
        pollingId: query.pollingId,
        resultOpen: false,
        basicInfo: {
          isOwner: query.basicInfo.isOwner,
          subject: query.basicInfo.subject,
          pollingEndTime: query.basicInfo.pollingEndTime,
          availableTimeFrom: query.basicInfo.availableTimeFrom,
          availableTimeTo: query.basicInfo.availableTimeTo,
          startPoint: query.basicInfo.startPoint,
          isMultipleChoice: query.basicInfo.isMultipleChoice
        },
        options: query.options,
        result: {
          voteRank: [],
          distanceRank: [],
          mutualAvailablity: {
            filteredAvailableTimeFrom: -1,
            filteredAvailableTimeTo: -1
          }
        },
        socketpush: query.socketpush
      };
    } else {
      if (params.pollingId) {
        // get polling info from the DB and assign them into states
        this.state = {
          userId: this.props.userId,
          resultOpen: false,
          userId: this.props.userId,
          pollingId: params.pollingId,
          basicInfo: {
            isOwner: true,
            subject: "",
            pollingEndTime: Date.now(),
            availableTimeFrom: Date.now(),
            availableTimeTo: Date.now(),
            startPoint: "",
            isMultipleChoice: true
          },
          options: [],
          result: {
            voteRank: [],
            distanceRank: [],
            mutualAvailablity: {
              filteredAvailableTimeFrom: -1,
              filteredAvailableTimeTo: -1
            }
          },
          socketpush: this.props.socketpush
        };
      } else {
        this.state = {
          userId: this.props.userId,
          pollingId: "",
          resultOpen: false,
          basicInfo: {
            isOwner: true,
            subject: "",
            pollingEndTime: Date.now(),
            availableTimeFrom: Date.now(),
            availableTimeTo: Date.now(),
            startPoint: "",
            isMultipleChoice: true
          },
          options: [],
          result: {
            voteRank: [],
            distanceRank: [],
            mutualAvailablity: {
              filteredAvailableTimeFrom: -1,
              filteredAvailableTimeTo: -1
            }
          },
          socketpush: this.props.socketpush
        };
      }
    }
  }

  componentDidMount() {
    if (this.props.match.params.pollingId) {
      const param = {
        userId: this.state.userId,
        pollingId: this.props.match.params.pollingId
      };
      // axios.post('http://localhost:5000/getPollingById', param)
      axios.post("https://dining-helper.herokuapp.com/getPollingById", param)
        .then(res => {
          this.setState({
            basicInfo: res.data.basicInfo,
            options: res.data.options
          });
        });
    }
  }

  changeBasicInfo(key, value) {
    var basicInfo = { ...this.state.basicInfo };
    basicInfo[key] = value;
    this.setState({ basicInfo: basicInfo });
  }

  changeResultOpen(newValue) {
    this.setState({ resultOpen: newValue });
    const param = { pollingId: this.state.pollingId };
    // axios.post("http://localhost:5000/getAnalysedResult", param)
    axios.post("https://dining-helper.herokuapp.com/getAnalysedResult", param)
      .then(res => {
        console.log("getAnalysedResult:", res);
        this.setState({
          result: res.data
        });
      });
  }

  renderLabel(subject) {
    return <Label subject={subject} />;
  }

  renderTextInput(content, hint, isOwner) {
    return (
      <TextInput
        content={content}
        hint={hint}
        changeBasicInfo={this.changeBasicInfo}
        isOwner={isOwner}
      />
    );
  }

  renderSwitch() {
    return (
      <SwitchToggle
        resultOpen={this.state.resultOpen}
        changeResultOpen={this.changeResultOpen}
      />
    );
  }

  renderPlainText(text) {
    return <PlainText text={text} />;
  }

  renderDateTimePicker(index, hint, time, isOwner) {
    return (
      <DateTimePicker
        index={index}
        hint={hint}
        time={time}
        changeBasicInfo={this.changeBasicInfo}
        isOwner={isOwner}
      />
    );
  }

  renderResult() {
    return <Result result={this.state.result} />;
  }

  checkIfFieldsNotNull() {
    var basicInfo = this.state.basicInfo;
    if (basicInfo.subject && basicInfo.startPoint) return true;
    else return false;
  }

  jumpToOptionPage = () => {
    if (this.checkIfFieldsNotNull() === false)
      alert("please fill all fields. User:" + this.state.userId);
    else if (this.state.basicInfo.availableTimeFrom >= this.state.basicInfo.availableTimeTo)
      alert(
        "availableTimeFrom should be smaller than availableTimeTo!"
      );
    else
      this.props.history.push({
        pathname: "/optionsPage",
        query: {
          socketpush: this.state.socketpush,
          userId: this.state.userId,
          pollingId: this.state.pollingId,
          basicInfo: this.state.basicInfo,
          options: this.state.options
        }
      });
  }

  jumpToMapPage = () => {
    this.props.history.push({
      pathname: "/mapPage",
      query: {
        socketpush: this.state.socketpush,
        userId: this.state.userId,
        pollingId: this.state.pollingId,
        basicInfo: this.state.basicInfo,
        options: this.state.options,
        previousPath: this.props.location.pathname
      }
    });
  }

  render() {
    var basicInfo = this.state.basicInfo;

    return (
      <div style={{ position: "relative" }}>
        <Scrollbars autoHide style={{ height: "89vh" }}>
          <div className="element">
            <div>{this.renderLabel("Subject")}</div>
            {this.renderTextInput(
              basicInfo.subject,
              "Input Subject Here",
              basicInfo.isOwner
            )}
          </div>
          <div className="element">
            <div>{this.renderLabel("Polling End Time")}</div>
            {this.renderDateTimePicker(
              0,
              "End Time",
              basicInfo.pollingEndTime,
              basicInfo.isOwner
            )}
            {/* {console.log("time:", basicInfo.pollingEndTime)} */}
          </div>
          <div className="element">
            <div>{this.renderLabel("Available Time")}</div>
            {this.renderDateTimePicker(
              1,
              "From",
              basicInfo.availableTimeFrom,
              true
            )}
            <div>
              {" "}
              {this.renderDateTimePicker(
                2,
                "To",
                basicInfo.availableTimeTo,
                true
              )}
            </div>
          </div>
          <div className="element">
            <div>{this.renderLabel("Start Point")}</div>
            <div className="option">
              <a>
                <font color="0084ff">{basicInfo.startPoint}</font>
              </a>
              <button
                style={{
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  position: "absolute",
                  right: "14px"
                }}
                onClick={this.jumpToMapPage}
              >
                <img
                  src={map_button}
                  alt="continue"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </div>
          </div>
          <div class="toggle" >
            {this.renderPlainText("Show Current Result")}
            <div style={{ position: "absolute", right: "14px" }}>
              {this.renderSwitch(0)}
            </div>
          </div>
          <UnmountClosed isOpened={this.state.resultOpen}>
            {this.renderResult()}
          </UnmountClosed>
        </Scrollbars>
        
        <div className="bottom">
        <button
          style={{
            outline: "none",
            padding: "0px",
            border: "none",
            width: "97%",
            height: "90%"
          }}
          onClick={this.jumpToOptionPage}
        >
          <img
            src={continue_button}
            alt="continue"
            style={{ width: "100%", height: "100%" }}
          />
        </button></div>
      </div>
    );
  }
}

export default BasicInfoPage;
