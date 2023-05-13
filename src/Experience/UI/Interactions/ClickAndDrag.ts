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
        // check if the move is in direction of the bottom of the screen
        if (event.movementY > 0) {
          if (event.pageX > window.innerWidth / 2) {
            this.rotateModelYNegatif();
          }
          if (event.pageX < window.innerWidth / 2) {
            this.rotateModelYPositif();
          }
        }
        if (event.movementY < 0) {
          if (event.pageX > window.innerWidth / 2) {
            this.rotateModelYPositif();
          }
          if (event.pageX < window.innerWidth / 2) {
            this.rotateModelYNegatif();
          }
        }
      }
    });

    // same but for mobile
    document.addEventListener("touchmove", (event) => {
      if (event.touches.length === 1) {
        // check if the move is in direction of the bottom of the screen
        if (event.touches[0].clientY > this.previousTouch) {
          if (event.touches[0].clientX > window.innerWidth / 2) {
            this.rotateModelYNegatif();
          }
          if (event.touches[0].clientX < window.innerWidth / 2) {
            this.rotateModelYPositif();
          }
        }
        if (event.touches[0].clientY < this.previousTouch) {
          if (event.touches[0].clientX > window.innerWidth / 2) {
            this.rotateModelYPositif();
          }
          if (event.touches[0].clientX < window.innerWidth / 2) {
            this.rotateModelYNegatif();
          }
        }

        this.previousTouch = event.touches[0].clientY;
      }
    });
  }

  rotateModelYPositif() {
    this.model.rotation.y += 2;
  }

  rotateModelYNegatif() {
    this.model.rotation.y -= 2;
  }

  destroy() {
    document.removeEventListener("mousemove", (event) => {});
    document.removeEventListener("touchmove", (event) => {});
  }
}
