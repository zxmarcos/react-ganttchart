import React, { Component } from 'react';
import GTaskProgress from './GTaskProgress';

export default class GTask extends Component {
  render() {
    const { task, offset } = this.props;
    const toffset = offset * 25;
    const length = ((task.days() + 1) * 25);

    const style = { left: `${toffset}px`, width: `${length}px` };

    return (
      <div className="g-task" style={style}>
        <GTaskProgress value={30} />
        <span>{task.name}</span>
      </div>
    );
  }
}