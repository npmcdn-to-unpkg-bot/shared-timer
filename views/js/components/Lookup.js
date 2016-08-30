import React from "react";
import Moment from "moment";

const VISIBLE = { visibility: "visible" };
const HIDDEN = { visibility: "hidden" };

export default class Lookup extends React.Component {

  constructor() {
    super();
    this.state = {
      lookupIsVisible: true,
      lookupFailed: false,
      timer: {
        name: "",
        last_time: ""
      }
    };
  }

  lookup(e) {
    var timerName = document.getElementById('text_input').value;
    if(!timerName) { return; }
    fetch('/viewtimer/' + timerName).then((res) => {
        return res.json();
    }).then((data) => {
        this.setState({lookupIsVisible: false, lookupFailed: false, timer: data.timer});
    }).catch((err) => {
        this.setState({
          lookupIsVisible: true,
          lookupFailed: true,
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

  backToLookup(e) {
    this.setState({lookupIsVisible: true});
  }

  render() {

    const lookupClass = this.state.lookupIsVisible ? "" : " hidden";
    const viewTimerClass = this.state.lookupIsVisible ? " hidden" : "";
    const lookupFailedClass = this.state.lookupFailed ? "visible" : "hidden";

    return (
      <div>
        <form class={lookupClass}>
          <input id="text_input" placeholder="Enter your timer name"></input>
          <button onClick={this.lookup.bind(this)} class="btn btn-primary">Submit</button>
        </form>
        <div class={"" + lookupFailedClass}>
          Could not find a timer under that name
        </div>
        <div class={"panel panel-default" + viewTimerClass}>
          <div class="panel-heading">
            <div class="panel-title">{this.state.timer.name}</div>
          </div>
          <div class="panel-body">
            <div>Last updated: {Moment(this.state.timer.last_time).format("dddd, MMMM Do YYYY, h:mm a")}</div>
            <div>
              <button onClick={this.updateTimer.bind(this)} class="btn btn-primary">Reset</button>
              <button onClick={this.backToLookup.bind(this)} class="btn btn-default">Back to lookup</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
