import React from "react";

export default class CreateTimer extends React.Component {

  constructor() {
    super();
    this.state = {
      create_result: ""
    };
  }

  newTimer(e) {
    var baseName = document.getElementById('text_input').value;
    var jsonName = JSON.stringify({name: baseName});
    fetch('/newtimer',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonName
    }).then((res) => {
        console.log(res);
        return res;
    }).then((data) => {
        if(data.status === 1226) {
          this.setState({create_result: "That name is already in use :("});
        }
        else if(data.status === 1337) {
          this.setState({create_result: "Success!"});
        }
    }).catch((err) => {
        this.setState({create_result: "There was an error with your request :'("});
        throw new Error(err);
    });
  }

  render() {

    return (
      <div>
        <input type="text" id="text_input" placeholder="Base name?"></input>
        <button onClick={this.newTimer.bind(this)} class="btn btn-primary">Create Timer</button>
        <div>{this.state.create_result}</div>
      </div>
    );
  }
}
