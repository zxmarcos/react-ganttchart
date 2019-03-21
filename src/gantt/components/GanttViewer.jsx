import React, { Component } from "react";
import GTask from "./GTask";
import GTaskGroup from "./GTaskGroup";
import GTimeHeader from "./GTimeHeader";
import GanttProject from "./GanttProject";
import DateUtils from "../core/DateUtils";
import "./Gantt.css";

class GanttViewer extends Component {
  renderTask_(prjStartDate, task) {
    if (task.isGroup) {
      const stasks = [
        <div key={task.id} className="g-chart-viewport-task-row">
          <GTaskGroup
            task={task}
            offset={DateUtils.daysBetween(prjStartDate, task.start)}
          />
        </div>
      ];
      for (const subTask of task.taskList) {
        stasks.push(this.renderTask_(prjStartDate, subTask));
      }
      return stasks;
    } else {
      return (
        <div key={task.id} className="g-chart-viewport-task-row">
          <GTask
            task={task}
            offset={DateUtils.daysBetween(prjStartDate, task.start)}
          />
        </div>
      );
    }
  }

  renderTasks(context) {
    const { project } = context;
    return this.renderTask_(project.startDate(), project.root);
  }

  viewer(context) {
    const { project } = context;

    const startDate = project.startDate();
    const endDate = project.endDate();

    return (
      <div className="g-container">
        <GTimeHeader start={startDate} end={endDate} />
        <div className="g-chart-viewport">
          {this.renderTasks(context)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <GanttProject.Consumer>
        {context => this.viewer(context)}
      </GanttProject.Consumer>
    );
  }
}

export default GanttViewer;
