import React from 'react';
import {Label} from '../components/components';
import {TextInput} from '../components/components';
import {SwitchToggle} from '../components/components';
import {PlainText} from '../components/components';
import {DateTimePicker} from '../components/components';
import { Scrollbars } from 'react-custom-scrollbars';

import * as continue_button from '../continue.png';
import * as continue_dark_button from '../continue_dark.png';

class BasicInfoPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isOwner: true,
        subject: undefined,
        pollingEndTime: undefined,
        availableTimeFrom: undefined,
        availableTimeTo: undefined,
        isMultipleChoice: false,
        imageURL: continue_button
      };
      this.changeStateValue = this.changeStateValue.bind(this);
      // this.handleClick = this.handleClick.bind(this);
  }

  changeStateValue(key_value) {
    this.setState(key_value);
    setTimeout( (val=this.state) => {
      console.log(val);
    }, 1000);
  }

  renderLabel(subject) {
      return <Label subject={subject} />;
    }

  renderTextInput(content, hint, isOwner) {
    return <TextInput content={content} hint={hint} changeStateValue={this.changeStateValue} isOwner={isOwner}/>;
  }


  renderSwitch(isMultipleChoice) {
      return <SwitchToggle isMultipleChoice = {isMultipleChoice} changeStateValue= {this.changeStateValue}/>;
  }

  renderPlainText(text) {
      return <PlainText text={text}/>;
  }

  renderDateTimePicker(index, hint, isOwner) {
    return <DateTimePicker index={index}  hint={hint} changeStateValue= {this.changeStateValue} isOwner={isOwner}/>
  }

  checkIfFieldsNotNull(){
    if(this.state.subject && this.state.pollingEndTime && this.state.availableTimeFrom && this.state.availableTimeTo)
      return true;
    else
      return false;
  }
  //
  // handleClick() {
  //   if(this.checkIfFieldsNotNull())
  //     this.props.history.push({pathname: '/optionsPage', query: this.state});
  //   else
  //     alert("Please fill all fields!");
  // }

  render() {
    return (
      <div style={{position:"relative"}}>
          <Scrollbars autoHide style={{ height:"499px" }}>
              <div className="element">
                  <div>{this.renderLabel("Subject")}</div>
                  {this.renderTextInput(this.state.subject, "Input Subject Here", this.state.isOwner)}
              </div>
              <div className="element">
                  <div>{this.renderLabel("Polling End Time")}</div>
                  {this.renderDateTimePicker(0, "End Time", this.state.isOwner)}
              </div>
              <div className="element" >
                  <div>{this.renderLabel("Available Time")}</div>
                  {this.renderDateTimePicker(1, "From", true)}
                  <div > {this.renderDateTimePicker(2, "To", true)}</div>
              </div>
              <div className="element" >
                <div>{this.renderLabel("Start Point")}</div>
                <a><font color="0084ff">Choose Your Start Point</font></a>
              </div>
              <div className="element" style={{position:"relative"}}>
                  {this.renderPlainText("Multiple Choice")}
                  <div style={{position:"absolute", left:"318px", top:"8px"}}>{this.renderSwitch(this.state.isMultipleChoice)}</div>
              </div>
          </Scrollbars>
          <div className="bottom"></div>
            <button onMouseDown = {()=> {this.setState({imageURL: continue_dark_button})}}
                    onMouseUp = {()=> {this.setState({imageURL:continue_button})}}
                    style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}
                    onClick = {() => {
                      if(this.checkIfFieldsNotNull()===false)
                        alert("please fill all fields");
                      else if(this.state.availableTimeFrom.getTime() > this.state.availableTimeTo.getTime() )
                        alert("availableTimeFrom should be smaller than availableTimeTo!");
                      else
                        this.props.history.push({pathname: '/optionsPage', query:this.state });
                    }}>
                <img src= {this.state.imageURL}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button>
      </div>
    );
  }
}

export default BasicInfoPage;
