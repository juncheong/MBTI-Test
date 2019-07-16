import React, { Component } from "react";
import axios from "axios";
import Dimension from "../Dimension/Dimension";
import "./Result.css";

const url = process.env.REACT_APP_API_URL + ":" +  process.env.REACT_APP_API_PORT;

class Result extends Component {
  state = {
    results: [],
    questionData: [],
    scores: []
  };

  componentDidMount() {
    this.getResults().catch(err => {
      console.log(err);
    });
  }

  getResults = () => {
    return axios
      .get(url + "/api/result/" + this.props.match.params.id)
      .then(resp => {
        this.setState({ results: resp.data }, () => {
          this.getQuestionData();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getQuestionData = () => {
    return axios
      .get(url + "/api/questions")
      .then(resp => {
        this.setState({ questionData: resp.data }, () => {
          this.processData();
        });
      });
  };

  processData = () => {
    // runs through the data and calculates the test scores
    const questionData = this.state.questionData;
    const results = this.state.results;
    console.log(results);

    // EI - Extraversion (E) or Introversion (I)
    // SN - Sensing (S) or Intuition (N)
    // TF - Thinking (T) or Feeling (F)
    // JP - Judging (J) or Perceiving (P)
    const directEnum = Object.freeze({
      E: 0,
      I: 1,
      S: 2,
      N: 3,
      T: 4,
      F: 5,
      J: 6,
      P: 7
    });
    const scores = Array(8).fill(0);
    for (let i = 0; i < questionData.length; i++) {
      // //this commented out solution doesn't match the test cases
      // //it is based on an interpretation that each response represents
      // //a point between two meanings, rather than a line towards one

      // //shift values from 1 -> 7 to -3 -> 3 and skip neutral scores
      // const leanVal = results[i].value - 4;
      // if (leanVal === 0) continue;
      //
      // const meaning = questionData[i].meaning;
      // //data is stored as binary 0 or 1 in db so make 0 negative
      // const direction = questionData[i].direction < 1 ? -1 : 1;
      //
      // if (Math.sign(direction) === Math.sign(leanVal))
      //   //both direction and score points to the same direction on scale
      //   scores[directEnum[meaning]] += Math.abs(leanVal);
      // else {
      //   //score is opposite of the direction so we have to find the index
      //   //in our enum that is the opposite of our meaning
      //   //Ex: if 'E' aka 0, add 1 so that it is 'I'.
      //   //    if 'I' aka 1, sub 1 so that it is 'E'
      //   let index = directEnum[meaning];
      //   index += index % 2 === 0 ? 1 : -1;
      //   scores[index] += Math.abs(leanVal);
      // }

      console.log(results[i]);
      const val = results[i].value - 4;
      const meaning = questionData[i].meaning;
      scores[directEnum[meaning]] += val;
    }
    this.setState({ scores: scores });
  };

  setType = () => {
    let type = "";
    const scores = this.state.scores;
    type += scores[0] >= scores[1] ? "E" : "I";
    type += scores[2] >= scores[3] ? "S" : "N";
    type += scores[4] >= scores[5] ? "T" : "F";
    type += scores[6] >= scores[7] ? "J" : "P";
    return type;
  };

  render() {
    if (this.state.scores.length === 0) return null;
    const type = this.setType();
    const message = `Your type is ${type}`;
    return (
      <div className="Result jumbotron">
        <div className="Result-message">
          {message}
        </div>
        <div>
          <Dimension
            left="Extraversion(E)"
            right="Introversion(I)"
            lean={type.charAt(0) === "E" ? "left" : "right"}
          />
          <Dimension
            left="Sensing(S)"
            right="Intuition(N)"
            lean={type.charAt(1) === "S" ? "left" : "right"}
          />
          <Dimension
            left="Thinking(T)"
            right="Feeling(F)"
            lean={type.charAt(2) === "T" ? "left" : "right"}
          />
          <Dimension
            left="Judging(J)"
            right="Perceiving(P)"
            lean={type.charAt(3) === "J" ? "left" : "right"}
          />
        </div>
      </div>
    );
  }
}

export default Result;
