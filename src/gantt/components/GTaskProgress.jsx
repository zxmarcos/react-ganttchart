import React, { Component } from "react";
import { EvProgressChanged } from "../core/Task";

export default class GTaskProgress extends Component {
  constructor() {
    super();
    this.state = {
      dragging: false
    };

    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);
    this.el = {};

    this.updateMe = () => this.setState(this.state);
  }

  componentDidMount() {
    const { task } = this.props;
    task.on(EvProgressChanged, this.updateMe);
  }

  componentWillUnmount() {
    const { task } = this.props;
    task.un(EvProgressChanged, this.updateMe);
  }

  handleMouseDown(event) {
    event.preventDefault();
    this.setState({ dragging: true });
    document.addEventListener("mousemove", this.onMouseMove, false);
    document.addEventListener("mouseup", this.onMouseUp, false);
  }

  handleMouseMove(event) {
    if (this.state.dragging && !!this.el) {
      const { task } = this.props;
      // console.log("xxx", event.movementX);
      const maxWidth = this.el.parentNode.clientWidth;
      const width = this.el.clientWidth;

      const percent = Math.floor(
        Math.max(0, Math.min(100, ((width + event.movementX) * 100) / maxWidth))
      );

      task.setProgress(percent);
    }
  }

  handleMouseUp(event) {
    event.preventDefault();
    this.setState({ dragging: false });
    document.removeEventListener("mousemove", this.onMouseMove, false);
    document.removeEventListener("mouseup", this.onMouseUp, false);
  }

  render() {
    const { task } = this.props;
    return (
      <div
        ref={e => (this.el = e)}
        className="g-task-progress"
        style={{ width: `${task.getProgress()}%` }}
      >
        <div
          className="g-task-progress-gripper"
          onMouseDown={ev => this.handleMouseDown(ev)}
          onMouseMove={ev => this.handleMouseMove(ev)}
          onMouseUp={ev => this.handleMouseUp(ev)}
        />
      </div>
    );
  }
}
