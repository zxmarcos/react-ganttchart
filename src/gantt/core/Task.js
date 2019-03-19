import DateUtils from "./DateUtils";

let taskIdSequence = 1;

export default class Task {

  constructor(name, start, end, isGroup=false) {
    this.id = taskIdSequence++;
    this.name = name;
    this.start = start || new Date();
    this.end = end || new Date();
    this.taskList = [];
    this.isGroup = isGroup;
    this.parentGroup = null;
  }

  findTimespan() {
    if (this.isGroup) {
      this.start = Math.min.apply(null, this.taskList.map(t => t.startDate().getTime()));
      this.end = Math.max.apply(null, this.taskList.map(t => t.endDate().getTime()));
      this.start = new Date(this.start);
      this.end = new Date(this.end);
    }
    return [this.start, this.end];
  }

  addTask(task) {
    if (this.isGroup) {
      this.taskList.push(task);
      this.findTimespan();
    }
  }

  days() {
    return DateUtils.daysBetween(this.start, this.end);
  }

  startDate() {
    return this.start;
  }
  
  endDate() {
    return this.end;
  }
}