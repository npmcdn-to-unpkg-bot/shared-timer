import React from "react";

export default class CreateTimer extends React.Component {
  render() {

    return (
      <div>
        <form action="/newtimer" method="POST">
          <input type="text" name="name" placeholder="Base name?"></input>
          <button type="submit" class="btn btn-primary">Create Timer</button>
        </form>
      </div>
    );
  }
}
