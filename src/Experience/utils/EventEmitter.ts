type Listener<T extends Array<any>> = (...args: T) => void;
export class EventEmitter<EventMap extends Record<string, Array<any>>> {
  private eventListeners: {
    [event in keyof EventMap]?: Set<Listener<EventMap[event]>>;
  } = {};

  on<Event extends keyof EventMap>(
    eventName: Event,
    listener: Listener<EventMap[Event]>
  ): void {
    const listeners: Set<Listener<EventMap[Event]>> =
      this.eventListeners[eventName] ?? new Set();
    listeners.add(listener);
    this.eventListeners[eventName] = listeners;
  }

  trigger<Event extends keyof EventMap>(
    eventName: Event,
    ...args: EventMap[Event]
  ): void {
    const listeners: Set<Listener<EventMap[Event]>> =
      this.eventListeners[eventName] ?? new Set();
    for (const listener of listeners) {
      listener(...args);
    }
  }

  off<Event extends keyof EventMap>(
    eventName: Event,
    listener: Listener<EventMap[Event]>
  ): void {
    const listeners: Set<Listener<EventMap[Event]>> =
      this.eventListeners[eventName] ?? new Set();
    listeners.delete(listener);
    this.eventListeners[eventName] = listeners;
  }
}
