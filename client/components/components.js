import React from "react";
import Switch from "react-ios-switch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/customDatePicker.css";
import "../css/index.css";

import * as add_button from "../add.png";
import * as delete_button from "../delete.png";

class Label extends React.Component {
  render() {
    return <label className="key">{this.props.subject}</label>;
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.isOwner) {
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

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      if (this.props.isOwner) {
        this.setState({
          value: this.props.content,
          disabled: ""
        });
      } else {
        this.setState({
          value: this.props.content,
          disabled: "disabled"
        });
      }
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.changeBasicInfo("subject", event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        disabled={this.state.disabled}
        className="inputbox"
        value={this.state.value}
        placeholder={this.props.hint}
        onChange={this.handleChange}
      />
    );
  }
}

class SwitchToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.resultOpen
    };
  }

  render() {
    const { checked } = this.state;
    return (
      <Switch
        checked={checked}
        className="switch"
        onChange={checked => {
          this.setState({ checked });
          this.props.changeResultOpen(checked);
        }}
        onColor="rgb(0, 132, 255)"
        offColor="rgb(216,216,216)"
      />
    );
  }
}

class PlainText extends React.Component {
  render() {
    return <div className="plaintext"> {this.props.text}</div>;
  }
}

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.isOwner) {
      this.state = {
        // this new Date is  in GMT 0
        time: new Date(this.props.time),
        disabled: ""
      };
    } else {
      this.state = {
        time: new Date(this.props.time),
        disabled: "disabled"
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.time !== prevProps.time) {
      if (this.props.isOwner) {
        this.setState({
          time: new Date(this.props.time),
          disabled: ""
        });
      } else {
        this.setState({
          time: new Date(this.props.time),
          disabled: "disabled"
        });
      }
    }
  }

  handleChange = date => {
    this.setState({ time: date });
    if (this.props.index === 0) {
      this.props.changeBasicInfo("pollingEndTime", Date.parse(date));
    } else if (this.props.index === 1) {
      this.props.changeBasicInfo("availableTimeFrom", Date.parse(date));
    } else if (this.props.index === 2) {
      this.props.changeBasicInfo("availableTimeTo", Date.parse(date));
    }
  };

  onDatepickerRef(el) {
    if (el && el.input) el.input.readOnly = true;
  }

  render() {
    return (
      <DatePicker
        disabled={this.state.disabled}
        selected={this.state.time}
        onChange={this.handleChange}
        timeIntervals={15}
        showTimeSelect
        placeholderText={this.props.hint}
        dateFormat="Pp"
        ref={el => this.onDatepickerRef(el)}
      />
    );
  }
}

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
      isCreator: this.props.isCreator,
      isVoted: this.props.isVoted
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      this.setState({
        content: this.props.content,
        isCreator: this.props.isCreator,
        isVoted: this.props.isVoted
      });
    }
  }

  render() {
    return (
      <div className="option">
        <input
          type="checkbox"
          checked={this.state.isVoted}
          style={{ width: "24px", height: "24px" }}
          onChange={event => {
            if (event.target.checked) {
              this.setState({ isVoted: true });
              this.props.voteOption(this.props.index);
            } else {
              this.setState({ isVoted: false });
              this.props.notVoteOption(this.props.index);
            }
          }}
        />
        <a>
          <font color="0084ff">{this.state.content}</font>
        </a>
        {this.state.isCreator ? (
          <button
            style={{
              outline: "none",
              border: "none",
              background: "transparent",
              position: "absolute",
              right: "14px"
            }}
            onClick={() => {
              this.props.deleteOption(this.props.index);
            }}
          >
            <img
              src={delete_button}
              alt="continue"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        ) : null}
      </div>
    );
  }
}

class OptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      pollingId: this.props.pollingId,
      basicInfo: this.props.basicInfo,
      options: this.props.options,
      socketpush: this.props.socketpush
    };
    this.deleteOption = this.deleteOption.bind(this);
    this.voteOption = this.voteOption.bind(this);
    this.notVoteOption = this.notVoteOption.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) {
      this.setState({
        pollingId: this.props.pollingId,
        basicInfo: this.props.basicInfo,
        options: this.props.options
      });
    }
  }

  voteOption(index) {
    var array = [...this.state.options]; // make a separate copy of the array
    if (index !== -1) {
      array[index].isVoted = true;
      // this.setState({options: array}, ()=>);
      this.props.setOptions(array);
    }
  }

  notVoteOption(index) {
    var array = [...this.state.options]; // make a separate copy of the array
    if (index !== -1) {
      array[index].isVoted = false;
      // this.setState({options: array}, ()=>);
      this.props.setOptions(array);
    }
  }

  deleteOption(index) {
    var array = [...this.state.options]; // make a separate copy of the array
    if (index !== -1) {
      console.log("array before delete", array);
      array.splice(index, 1);
      // this.setState({options: array}, () => );
      this.props.setOptions(array);
      console.log("index to delete", index, "options after delete", array);
    }
  }

  render() {
    var options = this.state.options;
    // console.log('options',options);
    return (
      <div>
        {options.map((val, index) => {
          return (
            <Option
              content={val.content}
              isCreator={val.isCreator}
              isVoted={val.isVoted}
              index={index}
              voteOption={this.voteOption}
              notVoteOption={this.notVoteOption}
              deleteOption={this.deleteOption}
            />
          );
        })}
        <button
          style={{ outline: "none", border: "none", background: "transparent" }}
          onClick={() => {
            this.props.history.push({
              pathname: "/mapPage",
              query: {
                socketpush: this.state.socketpush,
                userId: this.state.userId,
                pollingId: this.state.pollingId,
                basicInfo: this.state.basicInfo,
                options: this.state.options,
                previousPath: this.props.location.pathname
              }
            });
          }}
        >
          <img
            src={add_button}
            alt="continue"
            style={{ width: "27px", height: "27px" }}
          />
        </button>
      </div>
    );
  }
}

export { Label };
export { TextInput };
export { SwitchToggle };
export { PlainText };
export { DateTimePicker };
export { OptionForm };
export { Option };
