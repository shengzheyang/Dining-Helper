import React from "react";
import { Label } from "../components/components";
import { PlainText } from "../components/components";
import { Scrollbars } from "react-custom-scrollbars";
import { Result } from "../components/components";
import axios from "axios";

class finalResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      pollingId: this.props.location.query.pollingId,
      subject: this.props.location.query.subject,
      pollingEndTime: this.props.location.query.pollingEndTime,
      result: undefined
    }
  }

  renderLabel(subject) {
    return <Label subject={subject} />;
  }

  renderPlainText(text) {
    return <PlainText text={text} />;
  }

  renderResult() {
    return <Result result={this.state.result} />;
  }

  render() {
    if(this.state.load === false){
      const param = { pollingId: this.state.pollingId };
      axios.post("https://dining-helper.herokuapp.com/getAnalysedResult", param)
      // axios.post("http://localhost:5000/getAnalysedResult", param)
        .then(res => {
          this.setState({
            load: true,
            result: res.data
          }, () => alert("This polling has ended."));
        });
      return (<div></div>);
    } else {
        // console.log("jjjj");
      return (
        <Scrollbars autoHide style={{ height: "100vh" }}>
          <div className="element">
            <div>{this.renderLabel("Subject")}</div>
            {this.renderPlainText(
              this.state.subject
            )}
          </div>
          <div class="element">
            <div>{this.renderLabel("Polling End Time")}</div>
            {this.renderPlainText(
              new Date(this.state.pollingEndTime).toLocaleString()
            )}
          </div>
          <div class="element">
            {this.renderLabel("Final Result")}
            {this.renderResult()}
          </div>
        </Scrollbars>
      );
    }
  }
}
export default finalResultPage;