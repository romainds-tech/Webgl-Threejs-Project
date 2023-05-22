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
      "div div_popup",
      "Sélectionnez un emplacement où déplacer votre objet",
      "island_title",
      PositionY.TOP
    );

    this.createPopupTextOnly(
      "popup_create_item_island",
      "div div_popup",
      "Selectionnez un emplacement où placer votre objet.",
      "island_title",
      PositionY.TOP
    );

    this.createPopupTextOnly(
      "popup_select_item_island",
      "div div_popup",
      "description du grigri + date d’obtention ",
      "island_title",
      PositionY.TOP_70
    );
  }

  setPopupCartomancie() {
    this.createPopupTextOnly(
      "popup_start_cartomancie",
      "div div_popup",
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
      "div div_arcane",
      "Je tire l'arcane majeure La Tempérance, qui représente l'équilibre, " +
        "la modération et l'harmonie. Cette carte indique que vous devrez bientôt trouver un juste milieu dans votre vie, " +
        "peut-être en cherchant un équilibre entre travail et vie personnelle, ou entre vos relations et vos obligations. " +
        "Vous pourriez être invité à prendre des décisions éclairées, à faire preuve de patience et à trouver une voie médiane pour atteindre vos objectifs.s",
      "text_arcane",
      PositionY.TOP_70
    );

    this.createPopupTextOnly(
      "popup_second_arcane_cartomancie",
      "div div_arcane",
      "Ensuite, je tire l'arcane mineure 6 des coupes, qui représente les souvenirs, " +
        "la nostalgie et la remémoration. Cette carte indique que vous pourriez être amené à vous " +
        "remémorer des moments heureux du passé, peut-être en vous connectant avec des amis ou de la " +
        "famille que vous n'avez pas vu depuis longtemps. Cette carte peut également indiquer une période " +
        "de réflexion et de contemplation, au cours de laquelle vous chercherez à comprendre vos racines et votre histoire personnelle.",
      "text_arcane",
      PositionY.TOP_70
    );

    this.createPopupTextOnly(
      "popup_prediction_cartomancie",
      "div div_arcane div_prediction",
      "En combinant ces deux cartes, je vois une image de vous cherchant à trouver un équilibre dans votre vie tout en vous remémorant votre passé et vos racines. Vous pourriez être appelé à prendre des décisions importantes en vous basant sur votre expérience passée, tout en gardant un œil sur l'avenir et en cherchant à créer un avenir plus équilibré et harmonieux. Gardez en tête que rien n'est figé dans le temps, et que vous pouvez toujours trouver un juste milieu et avancer avec confiance dans la vie.\n" +
        "<br>" +
        "<br>" +
        "et cela prend forme d’une géode enfermé dans une fiole symbole de ....",
      "text_arcane height_arcane",
      PositionY.TOP_55
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
