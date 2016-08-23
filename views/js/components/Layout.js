import React from "react";
import Moment from "moment";

import NavBar from "./NavBar";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "SHARED TIMER"
    };
  }

  updateTime() {
    setTimeout(() => {
      this.setState({ title: Moment().format("dddd, MMMM Do YYYY, h:mm a") });
    }, 5000);
  }

  render() {
    this.updateTime();
    return (
      <div>
        <NavBar />
        <div class="layout">
          <h1>{this.state.title}</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}
