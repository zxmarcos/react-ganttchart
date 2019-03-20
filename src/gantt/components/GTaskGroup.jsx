import React, { Component } from 'react';
import GTaskProgress from './GTaskProgress';

export default class GTaskGroup extends Component {
  render() {
    const { task, offset } = this.props;
    const toffset = offset * 25;
    const length = ((task.days() + 1) * 25);

    const style = { transform: `translate(${toffset}px, 0)`, width: `${length}px` };

    return (
      <div className="g-task g-task-group" style={style}>
        <GTaskProgress task={task} />
        <div className="g-task-group-bar"/>
        {/* <span>{task.name}</span> */}
      </div>
    );
  }
}