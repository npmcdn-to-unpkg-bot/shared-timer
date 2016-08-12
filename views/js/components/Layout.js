import React from "react";

import NavBar from "./NavBar";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "BASE TIMER"
    };
  }

  render() {
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
