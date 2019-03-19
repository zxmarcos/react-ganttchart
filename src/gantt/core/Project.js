import Task from "./Task";

export default class Project {
  constructor(name='', description='') {
    this.name = name;
    this.description = description;
    this.root = new Task(name, null, null, true);
    this.minDate = null;
    this.maxDate = null;
  }

  addTask(task) {
    this.root.taskList.push(task);
    const ts = this.root.findTimespan();
    this.minDate = ts[0];
    this.maxDate = ts[1];
  }

  startDate() {
    return this.minDate;
  }
  
  endDate() {
    return this.maxDate;
  }

}