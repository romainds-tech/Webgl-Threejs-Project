import { Experience } from "../Experience";
import {BoxGeometry, Group, Mesh, MeshLambertMaterial, Object3D, Raycaster, Scene, Vector2} from "three";
import CustomGlbLoader from "../utils/CustomGlbLoader";
import { allGlbs } from "../../Sources/glb/glb";
import Model3D from "../utils/Model3d";
import { allFbx } from "../../Sources/fbx/fbx";
import CustomFbxLoader from "../utils/CustomFbxLoader";
import Debug from "../utils/Debug";
import { GUI } from "lil-gui";
import {mapMainIslandData, mapPayIslandData, loadMap} from "./map"
import Sizes from "../utils/Sizes";
import Camera from "../Camera";
export default class Island {
  public experience: Experience;
  public scene: Scene;
  public sizes: Sizes
  public camera: Camera

  private baleine?: Model3D;
  private cubeVertex?: Model3D;

  public debug: Debug;
  public debugFolder: GUI | null;

  // Map
  public onMouseDown: (event: MouseEvent) => void
  public onMouseUp: () => void

  public mapGroup : Group
  private raycaster: Raycaster
  private mouse: Vector2
  private clickableObject: Array<Object3D>

  public cursor?: Mesh

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera

    this.debug = this.experience.debug;
    this.debugFolder = this.addDebugFolder();

    //
    this.mouse = new Vector2()
    this.clickableObject = new Array<Object3D>()
    this.raycaster = new Raycaster

    // this.loadAllModels();
    this.mapGroup = loadMap(mapMainIslandData, this.scene, this.clickableObject)
    this.mapGroupInfo()
    this.cursorMap()
    this.onMouseDown = this.onClickDown
    this.onMouseUp= this.onClickUp

    console.log(this.sizes)
    document.addEventListener( 'pointerdown', this.onMouseDown, false );
    document.addEventListener( 'pointerup', this.onMouseUp, false );
  }

  mapGroupInfo(){
    this.mapGroup.position.set(0,0,0)
    // this.mapGroup.scale.set(2,2,2)
  }

  cursorMap() {
    const cursorGeometry = new BoxGeometry(0.5, 4, 0.5)
    const cursorMaterial = new MeshLambertMaterial({
      color: 0xc0392b,
      transparent: true,
      opacity: 0
    })
    this.cursor = new Mesh(cursorGeometry, cursorMaterial)
    this.scene.add(this.cursor)
  }
  onClickDown = (event: MouseEvent) => {
    console.log(this.sizes)
    event.preventDefault();

    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY /window.innerHeight ) * 2 + 1;

    // Checking if the mouse projection is targeting a valid block in the clickableObjs array
    this.raycaster.setFromCamera( this.mouse, this.camera.instance );
    let intersects = this.raycaster.intersectObjects( this.clickableObject ); // get the list of targetable objects currently intersecting with raycaster

    if ( intersects.length > 0 ) // If there is a match mouse/block (if the array is not empty)
    {
      let selectedBloc = intersects[0].object
      if(this.cursor) {
        this.cursor.position.set(selectedBloc.position.x, selectedBloc.position.y, selectedBloc.position.z)
        this.cursor.material.opacity = 0.5;
        this.cursor.material.emissive.g = 0.5;
      }
    } else {
      if (this.cursor) {
        this.cursor.material.opacity = 0.5;
      }
    }
  }

  onClickUp = () => {
    if(this.cursor) {
      console.log("fthrjfvgbhjdres")
      this.cursor.material.emissive.g = 0;
    }
  }
  addDebugFolder(): GUI | null {
    if (this.debug.active) {
      return this.debug.ui!.addFolder("Island");
    }
    return null;
  }

  private async loadAllModels() {
    this.cubeVertex = await CustomGlbLoader.getInstance().loadOne(
      new Model3D(allGlbs.CubeVertexGroup)
    );
    this.baleine = await CustomFbxLoader.getInstance().loadOne(
      new Model3D(allFbx.Whale)
    );

    this.scene.add(this.cubeVertex.object!);
    this.scene.add(this.baleine.object);

    this.playAnimations();
  }

  private playAnimations(): void {
    if (this.baleine?.animationAction) {
      this.baleine.animationAction[1].play();
    }
  }

  update() {
    this.baleine?.mixer?.update(this.experience.time.delta * 0.001);
    // this.cubeVertex?.mixer?.update(this.experience.time.delta);
  }

  destroy() {
    this.baleine?.destroy();
    this.cubeVertex?.destroy();
  }
}
