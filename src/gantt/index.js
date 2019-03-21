import GanttViewer from "./components/GanttViewer";
import GanttProject from "./components/GanttProject";
import Task from "./core/Task";
import Project from "./core/Project";
import React from "react";
import ReactDOM from "react-dom";

const create = (id, project) => {
  ReactDOM.render(
    <GanttProject.Provider value={{ project }}>
      <GanttViewer />
    </GanttProject.Provider>,
    document.getElementById(id)
  );
};

export default {
  core: {
    Task,
    Project
  },
  GanttViewer,
  create
};
