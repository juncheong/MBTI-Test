import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Question from "../Question/Question";
import "./Test.css";

class Test extends Component {
  state = {
    questions: [],
    responses: Array(10).fill(0),
    email: ""
  };

  changeResponse = (index, val) => {
    this.setState(st => ({
      responses: [
        ...st.responses.slice(0, index),
        (st.responses[index] = val),
        ...st.responses.slice(index + 1)
      ]
    }));
  };

  validateResponses() {
    const responses = this.state.responses;
    for (let i = 1; i < responses.length; i++) {
      if (responses[i] === 0) return false;
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.validateResponses()) alert("Please answer every question");
    else {
      axios
        .post("http://localhost:5000/api/response", {
          email: this.state.email,
          questionResponses: this.state.responses
        })
        .then(response => {
          this.props.history.push("result/" + response.data.responseId);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 400)
            alert("400 Error. A duplicate email perhaps?");
        });
    }
  };

  handleEmail = event => {
    this.setState({ email: event.target.value });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/questions")
      .then(resp => {
        this.setState({ questions: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.questions.length === 0) return null;

    const questions = Array.from(this.state.questions);
    const questionsList = questions.map(q => (
      <Question questionData={q} changeResponse={this.changeResponse} />
    ));
    return (
      <div className="Test">
        <div className="Test-container">
          {questionsList}
          <form onSubmit={this.handleSubmit}>
            Email
            <br />
            <input
              className="Test-email"
              type="email"
              placeholder="Your email"
              required
              onChange={this.handleEmail}
            />
            <br />
            <button className="Test-submit btn btn-secondary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Test);
