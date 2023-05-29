import { PositionY } from "../Enums/Position";

export default class Popup {
  private static instance: Popup;
  constructor() {
    Popup.instance = this;
  }

  public static getInstance(): Popup {
    if (!Popup.instance) {
      Popup.instance = new Popup();
    }
    return Popup.instance;
  }

  public createPopupTextOnly(
    idNameDivContainer: string,
    classStyleNameDivContainer: string,
    textDiv: string,
    classStyleNameText: string,
    position: PositionY
  ) {
    const divContainer = document.createElement("div");
    const titleH2 = document.createElement("h4");

    divContainer.id = idNameDivContainer;
    divContainer.className = classStyleNameDivContainer + " " + position;

    titleH2.innerHTML = textDiv;
    titleH2.className = classStyleNameText;

    document.body.appendChild(divContainer);
    divContainer.appendChild(titleH2);
  }
}
