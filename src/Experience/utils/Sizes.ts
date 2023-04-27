import { EventEmitter } from "./EventEmitter";

type EventMap = {
  resize: [number, number, number];
};

export default class Sizes extends EventEmitter<EventMap> {
  width: number;
  height: number;
  pixelRatio: number;
  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.trigger("resize", this.width, this.height, this.pixelRatio);
    });
  }
}
