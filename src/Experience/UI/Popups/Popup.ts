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
      "div_popup",
      "Sélectionnez un emplacement où déplacer votre objet",
      "island_title",
      PositionY.TOP
    );

    this.createPopupTextOnly(
      "popup_create_item_island",
      "div_popup",
      "Selectionnez un emplacement où placer votre objet.",
      "island_title",
      PositionY.TOP
    );

    this.createPopupTextOnly(
      "popup_select_item_island",
      "div_popup",
      "description du grigri + date d’obtention ",
      "island_title",
      PositionY.TOP_70
    );
  }

  setPopupCartomancie() {
    this.createPopupTextOnly(
      "popup_start_cartomancie",
      "div_popup",
      "Votre prédiction du jour provient de la\n" +
        "cartomancie\n" +
        "<br>" +
        "<br>" +
        "Cet art consiste en une pratique divinatoire qui utilise les cartes pour obtenir des informations ou des prédictions sur vos événements passés, présents ou futurs, ainsi que sur des aspects de votre vie.",
      "cartomancie_text",
      PositionY.MIDDLE
    );

    this.createPopupTextOnly(
      "popup_first_arcane_cartomancie",
      "div_arcane",
      "Je tire l'arcane majeure La Tempérance, qui représente l'équilibre, " +
        "la modération et l'harmonie. Cette carte indique que vous devrez bientôt trouver un juste milieu dans votre vie, " +
        "peut-être en cherchant un équilibre entre travail et vie personnelle, ou entre vos relations et vos obligations. " +
        "Vous pourriez être invité à prendre des décisions éclairées, à faire preuve de patience et à trouver une voie médiane pour atteindre vos objectifs.s",
      "text_arcane",
      PositionY.TOP_70
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
