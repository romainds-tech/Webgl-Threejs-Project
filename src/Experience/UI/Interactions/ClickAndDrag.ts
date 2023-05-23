/**
 * Click and drag interaction
 * @class ClickAndDrag
 * @classdesc Click and drag interaction
 *
 */
import { Object3D } from "three";
import { EventEmitter } from "../../utils/EventEmitter";

export enum Event {
  ROTATION,
  TRANSLATION,
  SCALE,
}

type EventMap = {
  rotationMovement: [];
};

export default class ClickAndDrag extends EventEmitter<EventMap> {
  private event: Event;
  private model: Object3D;
  private previousTouch: number = 0;

  constructor(model: Object3D, event: Event) {
    super();
    this.model = model;
    this.event = event;

    this.init();
  }

  init() {
    // Check event Enum and add the right listener
    switch (this.event) {
      case Event.ROTATION:
        this.detectClickAndDragMobile();
        this.detectClickAndDragMouse();
    }
  }

  private detectClickAndDragMouse() {
    document.addEventListener("mousemove", (event: MouseEvent) => {
      if (event.buttons === 1) {
        this.addRotationListenerMouse(event);
      }
    });
  }
  private detectClickAndDragMobile() {
    document.addEventListener("touchmove", (event: TouchEvent) => {
      if (event.touches.length === 1) {
        this.addRotationListenerMobile(event);
        this.previousTouch = event.touches[0].clientY;
      }
    });
  }

  private addRotationListenerMouse(event: MouseEvent) {
    if (event.pageX > window.innerWidth / 2) {
      event.movementY > 0
        ? this.rotateModelYNegatif()
        : this.rotateModelYPositif();
    } else {
      event.movementY > 0
        ? this.rotateModelYPositif()
        : this.rotateModelYNegatif();
    }
  }
  private addRotationListenerMobile(event: TouchEvent) {
    if (event.touches[0].clientX > window.innerWidth / 2) {
      event.touches[0].clientY > this.previousTouch
        ? this.rotateModelYNegatif()
        : this.rotateModelYPositif();
    } else {
      event.touches[0].clientY > this.previousTouch
        ? this.rotateModelYPositif()
        : this.rotateModelYNegatif();
    }
  }

  private rotateModelYPositif(step: number = 0.02) {
    this.model.rotation.y += step;
    this.trigger("rotationMovement");
  }
  private rotateModelYNegatif(step: number = 0.02) {
    this.model.rotation.y -= step;
    this.trigger("rotationMovement");
  }

  destroy() {
    // remove listeners
    document.removeEventListener("mousemove", () => {});
    document.removeEventListener("touchmove", () => {});
  }
}
