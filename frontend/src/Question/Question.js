import React, { Component } from "react";
import "./Question.css";

class Question extends Component {
  handleResponse = event => {
    this.props.changeResponse(this.props.questionData.num, event.target.value);
  };
  render() {
    return (
      <div className="Question">
        {this.props.questionData.text}
        <form className="Question-form">
          <span className="Question-disagree">Disagree</span>
          <label
            className="Question-radio-inline"
            onInput={this.handleResponse}
          >
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="1"
            />
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="2"
            />
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="3"
            />
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="4"
            />
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="5"
            />
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="6"
            />
            <input
              className="Question-radio-button"
              type="radio"
              name="response"
              value="7"
            />
          </label>
          <span className="Question-agree">Agree</span>
        </form>
      </div>
    );
  }
}

export default Question;
