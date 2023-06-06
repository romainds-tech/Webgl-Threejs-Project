import { EventEmitter } from "./EventEmitter";

type EventMap = {
  tick: [];
};

export default class Time extends EventEmitter<EventMap> {
  start: number;
  current: number;
  elapsed: number;
  delta: number;

  constructor() {
    super();

    // @ts-ignore
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    window.requestAnimationFrame((): void => {
      this.tick();
    });
  }

  tick() {
    // @ts-ignore
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame((): void => {
      this.tick();
    });
  }
}
