import React from 'react';
import Switch from 'react-ios-switch';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/customDatePicker.css";
import '../css/index.css';

import * as add_button from '../add.png';
import * as delete_button from '../delete.png';

class Label extends React.Component {
  render() {
    return (
        <label className="key">{this.props.subject}</label>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
      super(props);
      if(this.props.isOwner) {
        this.state = {
          value: this.props.content,
          disabled: ""
        };
      } else {
        this.state = {
          value: this.props.content,
          disabled: "disabled"
        };
      }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.changeStateValue({subject: event.target.value});
    }

    render() {
      return (
          <input type="text" disabled={this.state.disabled} className="inputbox" value={this.state.value} placeholder={this.props.hint} onChange={this.handleChange} />
      );
    }
  }

class SwitchToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.isMultipleChoice
    }
  }

  render() {
    const { checked } = this.state;
    return (
      <Switch
        checked= {checked}
        className="switch"
        onChange={checked => {
          this.setState({ checked });
          this.props.changeStateValue({isMultipleChoice: checked});
        }}
        onColor="rgb(0, 132, 255)"
        offColor = "rgb(216,216,216)"
      />
    );
  }
}

class PlainText extends React.Component {
  render() {
    return (
      <div  className="plaintext"> {this.props.text}</div>
    );
  }
}

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.isOwner) {
      this.state = {
        time: undefined,
        disabled: ""
      };
    } else {
      this.state = {
        time: undefined,
        disabled: "disabled"
      };
    }

  }

  handleChange = date => {
   this.setState({time: date});
   if(this.props.index === 0){
     this.props.changeStateValue({pollingEndTime: date});
   }else if(this.props.index === 1){
     this.props.changeStateValue({availableTimeFrom: date});
   }else if(this.props.index === 2){
     this.props.changeStateValue({availableTimeTo: date});
   }
  };

  onDatepickerRef(el) {
    if (el && el.input)
     el.input.readOnly = true;
  }

  render() {
   return (
       <DatePicker
         disabled={this.state.disabled}
         selected={this.state.time}
         onChange={this.handleChange}
         timeIntervals={15}
         showTimeSelect
         placeholderText= {this.props.hint}
         dateFormat="Pp"
         ref={el => this.onDatepickerRef(el)}
       />
   );
  }
}

class Option extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: this.props.content,
      isCreator: this.props.isCreator,
      isVoted: this.props.isVoted,
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.content!== prevProps.content) {
      this.setState({
        content: this.props.content,
        isCreator: this.props.isCreator,
        isVoted: this.props.isVoted
      });
    }
  }

  render() {
    return(
      <div className="option">
        <input type="checkbox" checked = {this.state.isVoted} style={{width:"24px", height:"24px"}}
          onChange={checked => {
            this.setState({ isVoted: checked });
            this.props.voteOption(this.props.index);
          }}
        />
        <a className="optionName"><font color="0084ff">{this.state.content}</font></a>
        {
          this.state.isCreator ?
              <button style={{outline:"none", border:"none", background:"transparent", position:"absolute", right:"14px"}}
                      onClick = {() => {this.props.deleteOption(this.props.index)}}>
                  <img src= {delete_button}  alt="continue" style={{width:"24px", height:"24px"}} />
              </button>
          : null
        }
      </div>
    );
  }
}

class OptionForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        basicInfo: this.props.basicInfo,
        options: this.props.options,
      }
      this.deleteOption = this.deleteOption.bind(this);
      this.voteOption = this.voteOption.bind(this);
  }

  voteOption(index) {
    var array = [...this.state.options]; // make a separate copy of the array
    if (index !== -1) {
      array[index].isVoted = true;
      this.setState({options: array});
    }
  }

  deleteOption(index) {
    var array = [...this.state.options]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({options: array});
    }
  }

  render() {
    var options = this.state.options;
    console.log('options',options);

    return(
      <div>
      {
        options.map( (val, index) => {
          return (
            <Option content = {val.content}
              isCreator = {val.isCreator}
              isVoted = {val.isVoted}
              index = {index}
              voteOption = {this.voteOption}
              deleteOption = {this.deleteOption}/>
          );
        })
      }
      <button style={{outline:"none", border:"none", background:"transparent"}}
              onClick = {() => {this.props.history.push({pathname: '/mapPage', query: this.state});} }>
          <img src= {add_button}  alt="continue" style={{width:"27px", height:"27px"}} />
      </button>
    </div>
    );
  }
}

export  {Label};
export  {TextInput};
export  {SwitchToggle};
export  {PlainText};
export  {DateTimePicker};
export  {OptionForm};
export  {Option};
