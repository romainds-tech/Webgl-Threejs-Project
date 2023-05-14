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



export default class ClickAndDrag {
  private event: Event;
  private model: Object3D;
  private previousTouch: number = 0;

  constructor(model: Object3D, event: Event) {

    this.model = model;
    this.event = event;

    this.init();
  }

  init() {
    // Check event Enum and add the right listener
    switch (this.event) {
        case Event.ROTATION:
            this.addRotationListener();
    }
  }


  private addRotationListener() {
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


  private rotateModelYPositif(step: number = 1) {
    this.model.rotation.y += step;
  }

  private rotateModelYNegatif(step: number = 1) {
    this.model.rotation.y -= step;
  }

  destroy() {
    // remove listeners

  }
}
