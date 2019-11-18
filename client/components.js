import React from 'react';
import Switch from 'react-ios-switch';
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./customDatePicker";
import './index.css';
//import "react-datepicker/dist/react-datepicker.css";

import * as add_button from '../public/assets/add.png';

class Label extends React.Component {
  render() {
    return (
        <label>{this.props.subject}</label>
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

  render() {
   return (
       <DatePicker
         disabled={this.state.disabled}
         selected={this.state.time}
         onChange={this.handleChange}
         showTimeSelect
         placeholderText= {this.props.hint}
         dateFormat="Pp"
       />
   );
  }
}

class OpForm extends React.Component {
  constructor(props) {
      super(props);
      if(this.props.options.length === 0) {
        this.state = {
            options: [{"name":"", isCreator: true, isVoted: true}],
            imageURL: add_button,
        }
      }
      else {
        this.state = {
            options: this.props.options,
            imageURL: add_button,
        }
      }
  }

  handleChange = (e) => {
      if (["name"].includes(e.target.className) ) {
        let options = [...this.state.options];
        options[e.target.dataset.id][e.target.className] = e.target.value;
        this.setState({ options }, () => console.log(this.state.options));
      } else {
        this.setState({ [e.target.name]: e.target.value });
      }
  }

  addOption = (e) => {
      if (this.state.options[this.state.options.length - 1].name === "") {
        alert("can't add a void option");
      } else {
        this.setState((prevState) => ({
        options: [...prevState.options, {name:"", isCreator: true, isVoted: true}],
        // Show...

        }));
      }
      e.preventDefault()
  }

  render() {
      let {options} = this.state
      return (
      <form onSubmit={this.addOption} onChange={this.handleChange} >
          {
            options.map((val, idx)=> {
                let OptionId = `Option-${idx}`;
                if(idx == options.length - 1){
                  return (
                    <div key={idx} style={{position:"relative"}}>
                      <button onClick={this.addOption} className="add_icon"  style={{outline:"none"}}>
                        <img src= {this.state.imageURL}  alt="Add" style={{width:"30px", height:"30px"}} />
                      </button>
                      {/* <label htmlFor={OptionId}>{`Option #${idx + 1}`}</label> */}
                      <input
                      type="text"
                      name={OptionId}
                      data-id={idx}
                      id={OptionId}
                      value={options[idx].name}
                      className="name"
                      />
                    </div>
                  )
                } else {
                  return (
                    <div key={idx} style={{position:"relative"}}>
                      <input
                      type="text"
                      name={OptionId}
                      data-id={idx}
                      id={OptionId}
                      value={options[idx].name}
                      className="name"
                      />
                    </div>
                  )
                }
            })
          }
      </form>
      )
  }
}

class Option extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: this.props.content,
      isCreator: this.props.isCreator,
      isVoted: this.props.isVoted
    }
  }

  render() {
    const { checked } = this.state.isVoted;
    return(
      <label>
        <input type="checkbox" checked = {checked}
          onChange={checked => {
            this.setState({ isVoted: checked });
            this.props.voteOption(this.props.index);
          }}
        />
        {this.state.content}

      </label>
    );
  }
}

class OptionForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        options: [
          {
            content: "uci",
            isCreator: true,
            isVoted: false
          },
          {
            content: "panda express",
            isCreator: false,
            isVoted:true
          }
        ],
        imageURL: add_button,
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


  addOption(){
    var array = [...this.state.options]; // make a separate copy of the array
    var option = {
      content: "",
      isCreator: true,
      isVoted: false
    }
    array.push(option);
    this.setState({options: array});
  }

  render() {
    var options = this.state.options;
    return(
      <div>{
        options.map( (val, index) => {
          console.log("content:",val.content, index);
          return (
            <Option content = {val.content}
              isCreator = {val.isCreator}
              isVoted = {val.isVoted}
              index = {index}
              voteOption = {this.voteOption}
              deleteOption = {this.deleteOption}/>
          );
        })
      }</div>
    )
  }
}


export  {Label};
export  {TextInput};
export  {SwitchToggle};
export  {PlainText};
export  {DateTimePicker};
export  {OptionForm};
export  {Option};
