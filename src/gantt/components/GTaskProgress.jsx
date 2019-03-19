import React, { Component } from 'react';

export default class GTaskProgress extends Component {
  render() {
    const { value } = this.props;
    return <div className="g-task-progress" style={{ width: `${value}%` }}/>;
  }
}