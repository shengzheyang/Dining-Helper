import React from 'react';
import {Label} from '../components/components';
import {TextInput} from '../components/components';
import {SwitchToggle} from '../components/components';
import {PlainText} from '../components/components';
import {DateTimePicker} from '../components/components';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

import * as continue_button from '../continue.png';
import * as map_button from '../map.png';


class BasicInfoPage extends React.Component {
  constructor(props) {
      super(props);
      this.initState();
      this.changeBasicInfo = this.changeBasicInfo.bind(this);
  }

  initState() {
    var query = this.props.location.query;
    var params = this.props.match.params;
    // from mapPage to basicInfoPage
    if(query) {
      console.log('contains query')
      this.state = {
        // loading: false,
        basicInfo: {
          isOwner: query.basicInfo.isOwner,
          subject: query.basicInfo.subject,
          pollingEndTime: new Date(query.basicInfo.pollingEndTime.valueOf()),
          availableTimeFrom: new Date(query.basicInfo.availableTimeFrom.valueOf()),
          availableTimeTo: new Date(query.basicInfo.availableTimeTo.valueOf()),
          startPoint: query.basicInfo.startPoint,
          isMultipleChoice: query.basicInfo.isMultipleChoice,
        },
        options: query.options
      };
    } else {
      if(params.pollingId) {
        // get polling info from the DB and assign them into states
        this.state = {
          // loading: true,
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
        
  
        console.log(params.pollingId);
      } else {
        this.state = {
          // loading: false,
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
  }

  componentDidMount() {
    const param = {
      pollingId: this.props.match.params.pollingId,
      userId: "user001",
    }
    axios.post('http://dining-helper.herokuapp.com/getPollingById', param)
    .then(res => {
      this.setState({basicInfo: res.data.basicInfo, options: res.data.options})
    })
    .then(() => console.log("state changed: ", this.state))
    .then(() => console.log("componentDidMount"))
  }

  changeBasicInfo(key, value) {
    var basicInfo = {...this.state.basicInfo};
    basicInfo[key] = value;
    this.setState({basicInfo: basicInfo});
  }

  renderLabel(subject) {
      return <Label subject={subject} />;
    }

  renderTextInput(content, hint, isOwner) {
    return <TextInput content={content} hint={hint} changeBasicInfo={this.changeBasicInfo} isOwner={isOwner}/>;
  }


  renderSwitch(isMultipleChoice) {
      return <SwitchToggle isMultipleChoice = {isMultipleChoice} changeBasicInfo= {this.changeBasicInfo}/>;
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
    console.log("render")

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
                            this.props.history.push({pathname: '/mapPage', query: {basicInfo:basicInfo, options: options, previousPath: this.props.location.pathname}});
                          }}>
                      <img src= {map_button}  alt="continue" style={{width:"24px", height:"24px"}} />
                  </button>
                </div>
              </div>
              <div className="element" style={{position:"relative"}}>
                  {this.renderPlainText("Multiple Choice")}
                  <div style={{position:"absolute", left:"318px", top:"8px"}}>{this.renderSwitch(basicInfo.isMultipleChoice)}</div>
              </div>
          </Scrollbars>
          <div className="bottom"></div>
            <button style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}
                    onClick = {() => {
                      console.log(basicInfo.availableTimeFrom.getTime())
                      if(this.checkIfFieldsNotNull()===false)
                        alert("please fill all fields");
                      // else if(basicInfo.availableTimeFrom.getTime() >= basicInfo.availableTimeTo.getTime())
                      //   alert("availableTimeFrom should be smaller than availableTimeTo!");
                      else
                        this.props.history.push({pathname: '/optionsPage', query: {basicInfo: basicInfo, options: options}});
                    }}>
                <img src= {continue_button}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button>
      </div>
    );
  }
}

export default BasicInfoPage;
