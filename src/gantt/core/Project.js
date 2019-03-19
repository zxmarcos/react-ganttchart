import Task from "./Task";
import Observable from "./Observable";

export const EvChanged = 'changed';

export default class Project extends Observable {
  constructor(name='', description='') {
    super();
    this.name = name;
    this.description = description;
    this.root = new Task(name, null, null, true);
    this.minDate = null;
    this.maxDate = null;
  }

  addTask(task) {
    this.root.taskList.push(task);
    const ts = this.root.calculateTimespan();
    this.minDate = ts[0];
    this.maxDate = ts[1];

    this.emit(EvChanged);
  }

  startDate() {
    return this.minDate;
  }
  
  endDate() {
    return this.maxDate;
  }

  progress() {
    return this.root.getProgress();
  }

}