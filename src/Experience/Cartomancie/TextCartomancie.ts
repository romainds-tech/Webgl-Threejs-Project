import { Experience } from "../Experience.js";

export default class TextCartomancie {
  public experience: Experience;
  public divCartomancie: HTMLDivElement;

  constructor() {
    this.experience = Experience.getInstance();

    this.divCartomancie = document.createElement("div");
    this.setText();
  }

  setText() {
    this.divCartomancie.id = "cartomancie";
    this.divCartomancie.style.cssText = `
        position: absolute;
        padding:4rem;
        width: 200px;
        color: white;
        background: #e7e7e777;
        border: 1px solid red;
        z-index: 42;
        top: 150%;
        left: 75%;
        transform: translate(-50%, -50%);
        `;

    document.body.appendChild(this.divCartomancie);
    this.divCartomancie.innerHTML = "fUne porte aussi belle que le texte";
  }
}
