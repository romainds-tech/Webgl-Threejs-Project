import { Camera, Object3D, Raycaster, Vector2, Event } from "three";

export default class RaycasterExperience {
  public raycaster: Raycaster;

  constructor() {
    this.raycaster = new Raycaster();
  }

  // get the list of targetable objects currently intersecting with raycaster
  getRaycastObject(mouse: Vector2, camera: Camera, object: Object3D<Event>[]) {
    this.raycaster.setFromCamera(mouse, camera);
    let intersect = this.raycaster.intersectObjects(object);
    return intersect;
  }
}
