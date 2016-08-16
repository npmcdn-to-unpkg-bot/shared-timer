import React from "react";
import Moment from "moment";

const VISIBLE = { visibility: "visible" };
const HIDDEN = { visibility: "hidden" };

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      loginIsVisible: true,
      loginFailed: false,
      timer: {
        name: "",
        last_time: ""
      }
    };
  }

  login(e) {
    var baseName = document.getElementById('text_input').value;
    if(!baseName) { return; }
    fetch('/viewtimer/' + baseName).then((res) => {
        return res.json();
    }).then((data) => {
        this.setState({loginIsVisible: false, loginFailed: false, timer: data.timer});
    }).catch((err) => {
        this.setState({
          loginIsVisible: true,
          loginFailed: true,
          timer: {
            name: "",
            last_time: ""
          }
        });
    });
  }

  updateTimer(e) {
    fetch('/updatetimer/' + this.state.timer.name, { method: 'PUT' }).then((res) => {
        return res.json();
    }).then((data) => {
        this.setState({timer: data.timer});
    }).catch((err) => {
        console.log("Update error");
        throw new Error(err);
    });
  }

  backToLogin(e) {
    this.setState({loginIsVisible: true});
  }

  render() {

    const loginClass = this.state.loginIsVisible ? "" : " hidden";
    const viewTimerClass = this.state.loginIsVisible ? " hidden" : "";
    const loginFailedClass = this.state.loginFailed ? "visible" : "hidden";

    return (
      <div>
        <form class={loginClass}>
          <input id="text_input" placeholder="Enter your base name"></input>
          <button onClick={this.login.bind(this)} class="btn btn-primary">Submit</button>
        </form>
        <div class={"" + loginFailedClass}>
          Could not find a base under that name
        </div>
        <div class={"panel panel-default" + viewTimerClass}>
          <div class="panel-heading">
            <div class="panel-title">{this.state.timer.name}</div>
          </div>
          <div class="panel-body">
            <div>Last updated: {Moment(this.state.timer.last_time).format("dddd, MMMM Do YYYY, h:mm a")}</div>
            <div>
              <button onClick={this.updateTimer.bind(this)} class="btn btn-primary">Reset</button>
              <button onClick={this.backToLogin.bind(this)} class="btn btn-default">Back to login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
