import { Experience } from "../Experience.js";

export default class TextItemIsland {
  public experience: Experience;
  public divCreateItemIsland: HTMLDivElement | null;
  public divModificateItemIsland: HTMLDivElement | null;

  constructor() {
    this.experience = Experience.getInstance();

    this.setText();
    this.divCreateItemIsland = document.querySelector("#popup_creation");
    this.divModificateItemIsland = document.querySelector(
      "#popup_modification"
    );
  }

  setText() {
    this.createPopup(
      "popup_creation",
      "island_div_popup",
      "island_title",
      "Positionner l'item ici ?",
      "island_div_button",
      "island_button_yes_no island_button_yes",
      "Oui",
      "island_button_yes_no island_button_no",
      "Non"
    );
  }

  createPopup(
    idNameDivContainer: string,
    classNameDivContainer: string,
    classNamePopupTitle: string,
    textPopupTitle: string,
    classNameDivButton: string,
    classNameYesButton: string,
    textYesButton: string,
    classNameNoButton: string,
    textNoButton: string
  ) {
    const divIsland = document.createElement("div");
    const titleH2Item = document.createElement("h2");
    const divButtonIsland = document.createElement("div");
    const yesButton = document.createElement("button");
    const noButton = document.createElement("button");

    divIsland.id = idNameDivContainer;
    divIsland.className = classNameDivContainer;

    document.body.appendChild(divIsland);

    titleH2Item.className = classNamePopupTitle;
    titleH2Item.innerHTML = textPopupTitle;
    divIsland.appendChild(titleH2Item);

    divButtonIsland.className = classNameDivButton;
    divIsland.appendChild(divButtonIsland);

    divButtonIsland.appendChild(yesButton);
    divButtonIsland.appendChild(noButton);

    yesButton.className = classNameYesButton;
    yesButton.innerHTML = textYesButton;

    noButton.className = classNameNoButton;
    noButton.innerHTML = textNoButton;
  }
}
