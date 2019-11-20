import React from 'react';
import ReactDOM from 'react-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import {Label} from '../components/components';
import {TextInput} from '../components/components';
import {PlainText} from '../components/components';
import {OptionForm} from '../components/components';
import {Option} from '../components/components';

import * as submit_button from '../submit.png';
import * as submit_dark_button from '../submit_dark.png';

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      imageURL: submit_button,
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

  renderOptionForm(options) {
    return <OptionForm options ={options}/>;
  }

  renderOption() {
    return <Option/>
  }

  render() {
    return (
        <div style={{position:"relative"}}>
            <Scrollbars autoHide style={{ height:"499px" }}>
                <div class="element">
                    <div class="label">{this.renderLabel("Subject")}</div>
                    {this.renderPlainText(this.props.location.query.subject)}
                </div>
                <div class="element">
                    <div class="label">{this.renderLabel("Polling End Time")}</div>
                    {this.renderPlainText(this.props.location.query.pollingEndTime.toLocaleString())}
                </div>
                <div class="element">
                  <div class="label">{this.renderLabel("Options")}</div>
                  {this.renderOptionForm()}
                </div>
            </Scrollbars>
            <div class="bottom">
            <button onClick="this.handleClick" onMouseDown = {()=> {this.setState({imageURL: submit_dark_button})}}
                    onMouseUp = {()=> {this.setState({imageURL:submit_button})}}
                    style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}>
                <img src= {this.state.imageURL}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button></div>

        </div>
    );
  }
}

export default OptionsPage;
