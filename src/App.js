import React, { Component } from "react";
import "./App.css";
import GanttViewer from "./gantt/components/GanttViewer";
import Task from "./gantt/core/Task";
import Project from "./gantt/core/Project";
import GanttProject from "./gantt/components/GanttProject";
import DateUtils from "./gantt/core/DateUtils";

class App extends Component {
  constructor() {
    super();
    this.project = new Project("Teste");

    if (false) {
      const end = new Date(2020, 3, 30);
      for (let i = 0; i < 3000; i++) {
        const start = DateUtils.randomDate(new Date(2019, 3, 1), end);
        const end2 = DateUtils.randomDate(start, end);
        const t = new Task(`T${i}`, start, end2);
        this.project.addTask(t);
      }
    } else {
      const t1 = new Task(
        "Tarefa 1",
        new Date(2019, 3, 1),
        new Date(2019, 3, 10)
      );
      const t2 = new Task(
        "Tarefa 2",
        new Date(2019, 3, 9),
        new Date(2019, 3, 19)
      );

      const t3 = new Task(
        "Tarefa 3",
        new Date(2019, 3, 22),
        new Date(2019, 3, 26)
      );
      const t4 = new Task(
        "Tarefa 4",
        new Date(2019, 3, 23),
        new Date(2019, 4, 4)
      );

      const t5 = new Task(
        "Tarefa 5",
        new Date(2019, 3, 2),
        new Date(2019, 3, 5)
      );


      const t6 = new Task(
        "Tarefa 6",
        new Date(2019, 3, 4),
        new Date(2019, 3, 9)
      );


      const t7 = new Task(
        "Tarefa 7",
        new Date(2019, 3, 9),
        new Date(2019, 3, 15)
      );

      const g1 = new Task('GRUPO 1', null, null, true);
      g1.addTask(t4);


      const g2 = new Task('GRUPO 2', null, null, true);
      g2.addTask(t5);
      g2.addTask(t6);
      g2.addTask(t7);

      this.project.addTask(t1);
      this.project.addTask(t2);
      this.project.addTask(t3);
      // this.project.addTask(t4);
      // this.project.addTask(t5);
      this.project.addTask(g1);
      this.project.addTask(g2);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <GanttProject.Provider value={{ project: this.project }}>
            <GanttViewer />
          </GanttProject.Provider>
        </div>
      </div>
    );
  }
}

export default App;
