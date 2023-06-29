type EventHandler<T> = (data: T) => void;

class EventEmitter<T> {
  private events: { [key: string]: EventHandler<T>[] };

  constructor() {
    this.events = {};
  }

  on(event: string, handler: EventHandler<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event: string, handler: EventHandler<T>) {
    const handlers = this.events[event];
    if (handlers) {
      this.events[event] = handlers.filter((h) => h !== handler);
    }
  }

  emit(event: string, data: T) {
    const handlers = this.events[event];
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}
export  default new EventEmitter()