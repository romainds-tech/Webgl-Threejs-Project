import { PositionY } from "../Enums/Position";

export default class Popup {
  public divModificateItemPositionIsland: HTMLDivElement | null;
  constructor() {
    this.divModificateItemPositionIsland = document.querySelector(
      "#popup_modification_item_island"
    );
  }

  setPopupIsland() {
    this.createPopupTextOnly(
      "popup_modification_item_island",
      "island_div_popup",
      "Sélectionnez un emplacement où déplacer votre objet",
      "island_title",
      PositionY.TOP
    );

    this.createPopupTextOnly(
      "popup_select_item_island",
      "island_div_popup",
      "description du grigri + date d’obtention ",
      "island_title",
      PositionY.MIDDLE
    );
  }

  createPopupTextOnly(
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

  destroy() {
    this.divModificateItemPositionIsland!.remove();
  }
}
