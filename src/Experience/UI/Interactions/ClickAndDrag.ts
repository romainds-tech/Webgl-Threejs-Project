/**
 * Click and drag interaction
 * @class ClickAndDrag
 * @classdesc Click and drag interaction
 *
 */
import { Object3D } from "three";
import { EventEmitter } from "../../utils/EventEmitter";

export enum EventClickDrag {
  ROTATION,
  TRANSLATION,
  SCALE,
}

type EventMap = {
  rotationMovement: [];
};

export default class ClickAndDrag extends EventEmitter<EventMap> {
  private event: EventClickDrag;
  private model: Object3D;
  private isOnboarding: boolean;
  private previousTouchX: number = 0;
  private previousTouchY: number = 0;

  constructor(model: Object3D, event: EventClickDrag, isOnboarding: boolean) {
    super();
    this.model = model;
    this.event = event;
    this.isOnboarding = isOnboarding;

    this.init();
  }

  init() {
    // Check event Enum and add the right listener
    switch (this.event) {
      case EventClickDrag.ROTATION:
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
        this.previousTouchY = event.touches[0].clientY;
        this.previousTouchX = event.touches[0].clientX;
      }
    });
  }

  private addRotationListenerMouse(event: MouseEvent) {
    if (this.isOnboarding) {
      if (event.pageX > window.innerWidth / 2) {
        event.movementY > 0
          ? this.rotateModelYNegatif()
          : this.rotateModelYPositif();
      } else {
        event.movementY > 0
          ? this.rotateModelYPositif()
          : this.rotateModelYNegatif();
      }
    } else {
      event.movementX > 0
        ? this.rotateModelYPositif(0.15)
        : this.rotateModelYNegatif(0.15);
    }
  }
  private addRotationListenerMobile(event: TouchEvent) {
    if (this.isOnboarding) {
      if (event.touches[0].clientX > window.innerWidth / 2) {
        event.touches[0].clientY > this.previousTouchY
          ? this.rotateModelYNegatif()
          : this.rotateModelYPositif();
      } else {
        event.touches[0].clientY > this.previousTouchY
          ? this.rotateModelYPositif()
          : this.rotateModelYNegatif();
      }
    } else {
      event.touches[0].clientX > this.previousTouchX
        ? this.rotateModelYPositif(0.05)
        : this.rotateModelYNegatif(0.05);
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
