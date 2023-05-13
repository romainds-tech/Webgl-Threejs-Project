/**
 * Click and drag interaction
 * @class ClickAndDrag
 * @classdesc Click and drag interaction
 *
 */
import { EventEmitter } from "../../utils/EventEmitter";
import { Object3D } from "three";

export enum Event {
  ROTATION,
  TRANSLATION,
  SCALE,
}

type EventMap = {
  dragBottom: [Event];
  dragTop: [Event];
};

export default class ClickAndDrag extends EventEmitter<EventMap> {
  private event: Event;
  private model: Object3D;
  private previousTouch: number;

  constructor(model: Object3D, event: Event) {
    super();

    this.model = model;
    this.event = event;

    this.init();
  }

  init() {
    // if the user is on a touch device, listen to touch events
    document.addEventListener("mousemove", (event) => {
      if (event.buttons === 1) {
        if (event.pageX > window.innerWidth / 2) {
          event.movementY > 0 ? this.rotateModelYNegatif() : this.rotateModelYPositif();
        } else {
          event.movementY > 0 ? this.rotateModelYPositif() : this.rotateModelYNegatif();
        }
      }
    });

    // same but for mobile
    document.addEventListener("touchmove", (event) => {
      if (event.touches.length === 1) {
        if (event.touches[0].clientX > window.innerWidth / 2) {
          event.touches[0].clientY > this.previousTouch ? this.rotateModelYNegatif() : this.rotateModelYPositif();
        } else {
          event.touches[0].clientY > this.previousTouch ? this.rotateModelYPositif() : this.rotateModelYNegatif();
        }
        this.previousTouch = event.touches[0].clientY;
      }
    });

  }

  rotateModelYPositif() {
    this.model.rotation.y += 1;
  }

  rotateModelYNegatif() {
    this.model.rotation.y -= 1;
  }

  destroy() {
    document.removeEventListener("mousemove", (event) => {});
    document.removeEventListener("touchmove", (event) => {});
  }
}
