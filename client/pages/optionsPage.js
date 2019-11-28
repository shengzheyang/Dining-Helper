import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
      pollingId: this.props.location.query.pollingId,
      basicInfo: this.props.location.query.basicInfo,
      options: this.props.location.query.options,
    };
    this.setOptions = this.setOptions.bind(this);
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
    return <OptionForm pollingId={this.state.pollingId} basicInfo={this.state.basicInfo} options ={this.state.options} setOptions={this.setOptions} history={this.props.history} location={this.props.location}/>;
  }

  setOptions(options) {
    this.setState({options:options});
  }

  render() {
    var basicInfo = this.state.basicInfo;
    var options = this.state.options;
    return (
        <div style={{position:"relative"}}>
            <Scrollbars autoHide style={{ height:"499px" }}>
                <div class="element">
                    <div class="label">{this.renderLabel("Subject")}</div>
                    {this.renderPlainText(basicInfo.subject)}
                </div>
                <div class="element">
                    <div class="label">{this.renderLabel("Polling End Time")}</div>
                    {this.renderPlainText(new Date(basicInfo.pollingEndTime).toLocaleString())}
                </div>
                <div class="element">
                  <div class="label">{this.renderLabel("Options")}</div>
                  {this.renderOptionForm()}
                </div>
            </Scrollbars>
            <div class="bottom">
            <button onClick={() => {
              // do not submit multiple times if data are the same

              const baseURL = "https://dining-helper.herokuapp.com" // heroku
              if (this.state.pollingId) {
                // get data from DB & compare data from DB and data about to submit
                // if changed, resubmit
                const param = {
                  pollingId: this.state.pollingId,
                  userId: "myUserId",
                }
                axios.post(baseURL + '/getPollingById', param)
                .then(res => {
                  const changedParams = {
                    userId: "myUserId",
                    pollingId: this.state.pollingId,
                    oldPolling: res.data,
                    newPolling: {basicInfo: this.state.basicInfo, options: this.state.options}
                  }
                  // console.log('changedParams', changedParams);
                  // re-submit
                  axios.post(baseURL + '/updatePollingIfChanged', changedParams)
                  .catch(
                    err => {console.log(err)}
                  )
                })
              } else {
                const userViewedPolling = {
                  basicInfo: this.state.basicInfo,
                  options: this.state.options,
                }
                axios.post(baseURL + '/addPolling', userViewedPolling)
                .then(res => console.log(res.data));
                // go back to FB views
              }
            }}
                    style={{outline:"none", position:"absolute", padding: "0px", left: "8px", bottom:"5px", border:"none"}}>
                <img src= {submit_button}  alt="continue" style={{width:"359px", height:"50px"}} />
            </button></div>

        </div>
    );
  }
}

export default OptionsPage;
