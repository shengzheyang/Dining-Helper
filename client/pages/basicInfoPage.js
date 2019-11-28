import React from 'react';
import {Label} from '../components/components';
import {TextInput} from '../components/components';
import {SwitchToggle} from '../components/components';
import {PlainText} from '../components/components';
import {DateTimePicker} from '../components/components';
<<<<<<< HEAD
import {Scrollbars} from 'react-custom-scrollbars';
import {UnmountClosed} from 'react-collapse';
=======
import { Scrollbars } from 'react-custom-scrollbars';
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
import axios from 'axios';

import * as continue_button from '../continue.png';
import * as map_button from '../map.png';


class BasicInfoPage extends React.Component {
  constructor(props) {
      super(props);
      this.initState();
      this.changeBasicInfo = this.changeBasicInfo.bind(this);
<<<<<<< HEAD
      this.changeResultOpen = this.changeResultOpen.bind(this);
=======
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
  }

  initState() {
    var query = this.props.location.query;
    var params = this.props.match.params;
    // from mapPage to basicInfoPage
    if(query) {
<<<<<<< HEAD
      console.log('start point', query.basicInfo.startPoint);
      this.state = {
        pollingId: query.pollingId,
        resultOpen: false,
        basicInfo: {
          isOwner: query.basicInfo.isOwner,
          subject: query.basicInfo.subject,
          pollingEndTime: query.basicInfo.pollingEndTime,
          availableTimeFrom: query.basicInfo.availableTimeFrom,
          availableTimeTo: query.basicInfo.availableTimeTo,
=======
      console.log('contains query')
      this.state = {
        // loading: false,
        basicInfo: {
          isOwner: query.basicInfo.isOwner,
          subject: query.basicInfo.subject,
          pollingEndTime: new Date(query.basicInfo.pollingEndTime.valueOf()),
          availableTimeFrom: new Date(query.basicInfo.availableTimeFrom.valueOf()),
          availableTimeTo: new Date(query.basicInfo.availableTimeTo.valueOf()),
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
          startPoint: query.basicInfo.startPoint,
          isMultipleChoice: query.basicInfo.isMultipleChoice,
        },
        options: query.options
      };
    } else {
      if(params.pollingId) {
        // get polling info from the DB and assign them into states
        this.state = {
<<<<<<< HEAD
          resultOpen: false,
          pollingId: params.pollingId,
=======
          // loading: true,
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
          basicInfo: {
            isOwner: true,
            subject: '',
            pollingEndTime: Date.now(),
            availableTimeFrom: Date.now(),
            availableTimeTo: Date.now(),
            startPoint: '',
            isMultipleChoice: true,
          },
          options: []
        };
<<<<<<< HEAD
      } else {
        this.state = {
          pollingId: "",
          resultOpen: false,
=======
        
  
        console.log(params.pollingId);
      } else {
        this.state = {
          // loading: false,
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
          basicInfo: {
            isOwner: true,
            subject: '',
            pollingEndTime: Date.now(),
            availableTimeFrom: Date.now(),
            availableTimeTo: Date.now(),
            startPoint: '',
            isMultipleChoice: true,
          },
          options: []
        };
      }
    }
<<<<<<< HEAD
  }

  componentDidMount() {
    if (this.props.match.params.pollingId) {
      const param = {
        pollingId: this.props.match.params.pollingId,
        userId: "myUserId",
      }
      axios.post('http://localhost:5000/getPollingById', param)
      .then(res => {
        this.setState({basicInfo: res.data.basicInfo, options: res.data.options})
      })
    }
  }

=======
  }

  componentDidMount() {
    const param = {
      pollingId: this.props.match.params.pollingId,
      userId: "user001",
    }
    axios.post('https://dining-helper.herokuapp.com/getPollingById', param)
    .then(res => {
      this.setState({basicInfo: res.data.basicInfo, options: res.data.options})
    })
    .then(() => console.log("state changed: ", this.state))
    .then(() => console.log("componentDidMount"))
  }

>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
  changeBasicInfo(key, value) {
    var basicInfo = {...this.state.basicInfo};
    basicInfo[key] = value;
    this.setState({basicInfo: basicInfo});
<<<<<<< HEAD
  }

  changeResultOpen(newValue) {
    this.setState({resultOpen: newValue});
=======
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
  }

  renderLabel(subject) {
      return <Label subject={subject} />;
    }

  renderTextInput(content, hint, isOwner) {
    return <TextInput content={content} hint={hint} changeBasicInfo={this.changeBasicInfo} isOwner={isOwner}/>;
  }


<<<<<<< HEAD
  renderSwitch() {
      return <SwitchToggle resultOpen={this.state.resultOpen} changeResultOpen={this.changeResultOpen}/>;
=======
  renderSwitch(isMultipleChoice) {
      return <SwitchToggle isMultipleChoice = {isMultipleChoice} changeBasicInfo= {this.changeBasicInfo}/>;
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
  }

  renderPlainText(text) {
      return <PlainText text={text}/>;
  }

  renderDateTimePicker(index, hint, time, isOwner) {
    return <DateTimePicker index={index}  hint={hint} time={time} changeBasicInfo= {this.changeBasicInfo} isOwner={isOwner}/>
  }

  checkIfFieldsNotNull(){
    var basicInfo = this.state.basicInfo;
    if(basicInfo.subject && basicInfo.startPoint )
      return true;
    else
      return false;
  }

  render() {
<<<<<<< HEAD
    // console.log("render")

    var pollingId = this.state.pollingId;
=======
    console.log("render")

>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
    var basicInfo = this.state.basicInfo;
    var options = this.state.options;
    return (
      <div style={{position:"relative"}}>
          <Scrollbars autoHide style={{ height:"499px" }}>
              <div className="element">
                  <div>{this.renderLabel("Subject")}</div>
                  {this.renderTextInput(basicInfo.subject, "Input Subject Here", basicInfo.isOwner)}
              </div>
              <div className="element">
                  <div>{this.renderLabel("Polling End Time")}</div>
                  {this.renderDateTimePicker(0, "End Time", basicInfo.pollingEndTime, basicInfo.isOwner)}
                  {/* {console.log("time:", basicInfo.pollingEndTime)} */}
              </div>
              <div className="element" >
                  <div>{this.renderLabel("Available Time")}</div>
                  {this.renderDateTimePicker(1, "From", basicInfo.availableTimeFrom, true)}
                  <div > {this.renderDateTimePicker(2, "To", basicInfo.availableTimeTo, true)}</div>
              </div>
              <div className="element" >
                <div>{this.renderLabel("Start Point")}</div>
                <div className="option">
                  <a><font color="0084ff">{basicInfo.startPoint}</font></a>
                  <button style={{outline:"none", border:"none", background:"transparent", position:"absolute", right:"14px"}}
                          onClick = {() => {
<<<<<<< HEAD
                            this.props.history.push({pathname: '/mapPage', query: {pollingId: pollingId, basicInfo:basicInfo, options: options, previousPath: this.props.location.pathname}});
=======
                            this.props.history.push({pathname: '/mapPage', query: {basicInfo:basicInfo, options: options, previousPath: this.props.location.pathname}});
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
                          }}>
                      <img src= {map_button}  alt="continue" style={{width:"24px", height:"24px"}} />
                  </button>
                </div>
              </div>
<<<<<<< HEAD
              <div class="element" style={{position:"relative"}}>
                  {this.renderPlainText("Show Current Result")}
                  <div style={{position:"absolute", left:"318px", top:"8px"}}>{this.renderSwitch(0)}</div>
                  <UnmountClosed isOpened={this.state.resultOpen}>
                    <a><font color="0084ff">here is the current result</font></a>
                  </UnmountClosed>
=======
              <div className="element" style={{position:"relative"}}>
                  {this.renderPlainText("Multiple Choice")}
                  <div style={{position:"absolute", left:"318px", top:"8px"}}>{this.renderSwitch(basicInfo.isMultipleChoice)}</div>
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
              </div>
          </Scrollbars>
          <div className="bottom"></div>
            <button style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}
                    onClick = {() => {
                      console.log(basicInfo.availableTimeFrom.getTime())
                      if(this.checkIfFieldsNotNull()===false)
                        alert("please fill all fields");
<<<<<<< HEAD
                      else if(basicInfo.availableTimeFrom >= basicInfo.availableTimeTo)
                        alert("availableTimeFrom should be smaller than availableTimeTo!");
                      else
                        this.props.history.push({pathname: '/optionsPage', query: {pollingId: pollingId, basicInfo: basicInfo, options: options}});
=======
                      // else if(basicInfo.availableTimeFrom.getTime() >= basicInfo.availableTimeTo.getTime())
                      //   alert("availableTimeFrom should be smaller than availableTimeTo!");
                      else
                        this.props.history.push({pathname: '/optionsPage', query: {basicInfo: basicInfo, options: options}});
>>>>>>> 51d422cf5d8701efa304b1f8f925ee7442fc3ae1
                    }}>
                <img src= {continue_button}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button>
      </div>
    );
  }
}

export default BasicInfoPage;
