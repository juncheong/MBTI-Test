import React, { Component } from "react";
import "./Dimension.css";

class Dimension extends Component {
  render() {
    let left = "Dimension-span-box left";
    let right = "Dimension-span-box right";
    if (this.props.lean === "left") left += " highlight";
    if (this.props.lean === "right") right += " highlight";
    return (
      <div className="Dimension">
        <span className="Dimension-span-text">{this.props.left}</span>
        <span className={left}></span>
        <span className={right}></span>
        <span className="Dimension-span-text">{this.props.right}</span>
      </div>
    );
  }
}

export default Dimension;
