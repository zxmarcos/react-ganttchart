import DateUtils from "./DateUtils";
import Observable from "./Observable";

let taskIdSequence = 1;

export const EvProgressChanged = 'progress-changed';
export const EvTimespanChanged = 'timespan-changed';

export default class Task extends Observable {
  constructor(name, start, end, isGroup = false) {
    super();
    this.id = taskIdSequence++;
    this.name = name;
    this.start = start || new Date();
    this.end = end || new Date();
    this.taskList = [];
    this.isGroup = isGroup;
    this.parent = null;
    this.completePercent = 0;
  }

  calculateTimespan() {
    if (this.isGroup) {
      this.start = Math.min.apply(
        null,
        this.taskList.map(t => t.startDate().getTime())
      );
      this.end = Math.max.apply(
        null,
        this.taskList.map(t => t.endDate().getTime())
      );
      this.start = new Date(this.start);
      this.end = new Date(this.end);
    }
    return [this.start, this.end];
  }

  calculateProgress() {
    if (this.isGroup) {
      let counter = 0;
      const lastProgress = this.completePercent;
      const sum = this.taskList.reduce((prev, task) => {
        counter++;
        return prev + task.calculateProgress();
      }, 0);

      if (counter > 0 && Number.isFinite(sum)) {
        this.completePercent = Number((sum / counter).toFixed(2));
      } else {
        this.completePercent = 0;
      }

      // Emit o evento se o valor for diferente.
      if (lastProgress !== this.completePercent) {
        this.emit(EvProgressChanged, this.completePercent);
        // Atualiza a percentagem do pai.
        console.log(this.parent);
        if (this.parent) {
          console.log('compute progress', this.name, this.parent.name);
          this.parent.calculateProgress();
        } 
      }
    }
    return this.completePercent;
  }

  addTask(task) {
    if (this.isGroup) {
      this.taskList.push(task);
      task.setParent(this);
      this.calculateTimespan();
    }
  }

  days() {
    return DateUtils.daysBetween(this.start, this.end);
  }

  setStart(date) {
    const last = this.start.getTime();
    this.start = date;
    if (last !== date.getTime()) {
      this.emit(EvTimespanChanged, [this.start, this.end]);
    }
  }

  setEnd(date) {
    const last = this.end.getTime();
    this.end = date;
    if (last !== date.getTime()) {
      this.emit(EvTimespanChanged, [this.start, this.end]);
    }
  }

  startDate() {
    return this.start;
  }

  endDate() {
    return this.end;
  }

  setProgress(percent) {
    if (!this.isGroup) {
      const changed = this.completePercent !== percent;
      this.completePercent = percent;
      if (changed) {
        this.emit(EvProgressChanged, percent);
        // Atualiza a percentagem do pai.
        if (this.parent) {
          this.parent.calculateProgress();
        } 
      }
    }
  }

  getProgress() {
    return this.calculateProgress();
  }

  getParent() {
    return this.parent;
  }

  setParent(parent) {
    this.parent = parent;
  }
}
