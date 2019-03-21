export default class Observable {
  constructor() {
    this.slots = {};
  }

  emit(event, ...parameters) {
    if (this.slots.hasOwnProperty(event)) {
      for (const fn of this.slots[event]) {
        fn(...arguments);
      }
    }
  }

  on(event, fn) {
    if (!this.slots.hasOwnProperty(event)) {
      this.slots[event] = [];
    }
    this.slots[event].push(fn);
  }

  un(event, fn) {
    if (this.slots.hasOwnProperty(event)) {
      this.slots[event] = this.slots[event].filter(f => f !== fn);
    }
  }
}
