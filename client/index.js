import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as logo from '../public/assets/calendar.png';

class Label extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="label">
        <label>{this.props.subject}</label>
      </div>
    );
  }
}

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
      return (
        <div className="textinput">
          <input type="text" value={this.state.value} placeholder={this.props.hint} onChange={this.handleChange} />
        </div>
      );
    }
}

class Calendar extends React.Component {
  render() {
    return (
        <button class="calendar">
            <img src={logo}  alt="logo" onClick={this.chooseDate} style={{width:"36px", height:"36px"}} />
        </button>
    );
  }
}
  
class Page extends React.Component {

  renderLabel(subject) {
      return <Label subject={subject} />;
    }

  renderTextInput(hint) {
    return <TextInput hint={hint} />;
  }

  renderCalendar() {
      return <Calendar />;
  }
  

  render() {
  //   const status = 'Next player: X';

    return (
      <div>
        <div class="element">
          {this.renderLabel("Subject")}
          {this.renderTextInput("Input Subject Here")}
        </div>
        <div class="element" style={{position:"relative"}}>
          {this.renderLabel("Polling End Time")}
          {this.renderTextInput("End Time")}
          <div style={{position:"absolute", left:"335px", top:"28px"}}> {this.renderCalendar()} </div>
        </div>
        <div class="element">
          {this.renderLabel("Available Time")}
          {this.renderTextInput("Input time")}
        </div>
      </div>
    );
  }
}
  
  
ReactDOM.render(
  <Page/>,
  document.getElementById('root')
);
  