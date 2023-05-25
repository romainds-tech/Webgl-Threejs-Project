import { GUI } from "lil-gui";

export default class Debug {
  public active: boolean;
  public ui: GUI | null;
  public debugModelFolder: GUI | null;
  constructor() {
    this.active = window.location.pathname.includes("debug");
    this.ui = null;

    this.addDebug();
    this.debugModelFolder = this.addModelDebugFolder()?.close();
  }

  addModelDebugFolder(): GUI | null {
    if (this.active) {
      return this.ui!.addFolder("Model");
    }
    return null;
  }

  addDebug(): void {
    if (this.active) {
      this.ui = new GUI();
    }
  }
}
