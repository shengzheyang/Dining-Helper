import React from 'react';
import ReactDOM from 'react-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import {Label} from '../components';
import {TextInput} from '../components';
import {PlainText} from '../components';
import {OptionForm} from '../components';
import {Option} from '../components';

import * as continue_button from '../../public/assets/continue.png';
import * as continue_dark_button from '../../public/assets/continue_dark.png';

class OptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      imageURL: continue_button,
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
                    {this.renderPlainText("{From previous page: }Which Restaurant to go this noon?")}
                </div>
                <div class="element">
                    <div class="label">{this.renderLabel("Polling End Time")}</div>
                    {this.renderPlainText("{From previous page: }2019-10-23 17:15")}
                </div>
                <div class="element">
                  <div class="label">{this.renderLabel("Options")}</div>
                  {this.renderOptionForm()}
                </div>
            </Scrollbars>
            <div class="bottom">
            <button onClick="this.handleClick" onMouseDown = {()=> {this.setState({imageURL: continue_dark_button})}}
                    onMouseUp = {()=> {this.setState({imageURL:continue_button})}}
                    style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}>
                <img src= {this.state.imageURL}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button></div>

        </div>
    );
  }
}

export default OptionsPage;
