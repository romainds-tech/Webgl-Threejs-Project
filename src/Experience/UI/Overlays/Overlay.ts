export default class Overlay {
  private static instance: Overlay;
  constructor() {
    Overlay.instance = this;
  }

  public static getInstance(): Overlay {
    if (!Overlay.instance) {
      Overlay.instance = new Overlay();
    }
    return Overlay.instance;
  }

  createOverlay(idOverlay: string, classStyleNameOverlay: string) {
    const overlay = document.createElement("div");
    overlay.id = idOverlay;
    overlay.className = classStyleNameOverlay;

    document.body.appendChild(overlay);
  }
}
