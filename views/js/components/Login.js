import React from "react";

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
    fetch('/viewtimer/' + baseName).then((response) => {
        return response.json();
    }).then((data) => {
        this.setState({loginIsVisible: false, loginFailed: false, timer: data.timer});
    }).catch((err) => {
        console.log("loginFailed");
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
    fetch('/updatetimer/' + this.state.timer.name, { method: 'PUT' }).then((response) => {
        return response.json();
    }).then((data) => {
        // const loginIsVisible = this.state.loginIsVisible;
        this.setState({timer: data.timer});
        console.log(this.state);
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
            <h3 class="panel-title">{this.state.timer.name}</h3>
          </div>
          <div class="panel-body">
            <div>Time until expiration: {this.state.timer.last_time.toLocaleString()}</div>
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
