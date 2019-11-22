import React from 'react';
import ReactDOM from 'react-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import {Label} from '../components/components';
import {TextInput} from '../components/components';
import {PlainText} from '../components/components';
import {OptionForm} from '../components/components';
import {Option} from '../components/components';

import * as submit_button from '../submit.png';

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicInfo: this.props.location.query.basicInfo,
      options: this.props.location.query.options,
    };
    this.changeLocationSwitch = this.changeLocationSwitch.bind(this);
  }

  changeLocationSwitch(newValue) {
    this.setState({locationSwitchChecked: newValue});
  }

  renderLabel(subject) {
      return <Label subject={subject} />;
    }

  renderTextInput(hint) {
    return <TextInput hint={hint} />;
  }

  renderPlainText(text) {
      return <PlainText text={text}/>;
  }

  renderOptionForm() {
    return <OptionForm basicInfo={this.state.basicInfo} options ={this.state.options} history={this.props.history}/>;
  }

  render() {
    return (
        <div style={{position:"relative"}}>
            <Scrollbars autoHide style={{ height:"499px" }}>
                <div class="element">
                    <div class="label">{this.renderLabel("Subject")}</div>
                    {this.renderPlainText(this.state.basicInfo.subject)}
                </div>
                <div class="element">
                    <div class="label">{this.renderLabel("Polling End Time")}</div>
                    {this.renderPlainText(this.state.basicInfo.pollingEndTime.toLocaleString())}
                </div>
                <div class="element">
                  <div class="label">{this.renderLabel("Options")}</div>
                  {this.renderOptionForm()}
                </div>
            </Scrollbars>
            <div class="bottom">
            <button onClick="this.handleClick"
                    style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}>
                <img src= {submit_button}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button></div>

        </div>
    );
  }
}

export default OptionsPage;
