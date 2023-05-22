export default class Overlay {
  constructor() {}

  setOverlayCartomancie() {
    this.createOverlay("overlay_start_cartomancie", "overlay_cartomancie");
    this.createOverlay("overlay_arcane", "overlay_all_arcane");
  }
  createOverlay(idOverlay: string, classStyleNameOverlay: string) {
    const overlay = document.createElement("div");
    overlay.id = idOverlay;
    overlay.className = classStyleNameOverlay;

    document.body.appendChild(overlay);
  }
}
