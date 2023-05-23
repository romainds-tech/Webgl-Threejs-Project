import { PositionX, PositionY } from "../Enums/Position";

export default class Button {
  public buttonAbandonnedModificateChangeItemPosition: HTMLButtonElement | null;

  constructor() {
    this.buttonAbandonnedModificateChangeItemPosition = document.querySelector(
      "#button_abandonned_modificate_change_item_position"
    );
  }

  setButtonIsland() {
    this.createButton(
      "abandonned_modificate_item_position_island",
      "button button_island",
      "ANNULER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "delete_button_item_island",
      "button button_island",
      "SUPPRIMER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "button_select_modificate_item_island",
      "button button_island",
      "DEPLACER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "button_disable_select_item_island",
      "button_cross_island",
      "X",
      PositionY.TOP,
      PositionX.RIGHT
    );
  }

  setButtonCartomancie() {
    this.createButton(
      "button_start_cartomancie",
      "button button_cartomancie",
      "COMMENCER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "button_first_arcane_cartomancie",
      "button button_prediction",
      "DEUXIÈME CARTE",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButtonWithIcon(
      "button_second_arcane_cartomancie",
      "button button_prediction",
      "fa fa-arrow-right margin_icon_right",
      "MA PRÉDICTION",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "button_display_prediction_cartomancie",
      "button button_prediction",
      "DÉCOUVRIR MON AMULETTE",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButtonWithIcon(
      "button_back_cartomancie",
      "button button_prediction_back button_icon_back",
      "fa fa-arrow-left margin_icon_left",
      "RETOUR",
      PositionY.TOP,
      PositionX.CENTER
    );

    this.createButton(
      "button_select_answer_question_item_cartomancie",
      "button button_white",
      "RÉPONDRE À UNE QUESTION",
      PositionY.TOP_70,
      PositionX.CENTER
    );

    this.createButtonWithIcon(
      "button_select_paid_item_cartomancie",
      "button little_width button_prediction button_icon_back",
      "fa fa-lock margin_icon_left",
      "DEBLOQUER L'OBJET"
      "2.99 €",
      PositionY.TOP_60,
      PositionX.CENTER
    );
  }

  setButtonOnboarding() {
    this.createButton(
      "button_onboarding",
      "button_prediction button",
      "button_onboarding",
      "Suivant",
      PositionY.BOTTOM,
      PositionX.CENTER
    );
  }

  createButton(
    idButton: string,
    classStyleNameButton: string,
    textButton: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const button = document.createElement("button");
    button.id = idButton;
    button.className = classStyleNameButton + " " + positionY + " " + positionX;
    button.innerHTML = textButton;

    document.body.appendChild(button);
  }

  createButtonWithIcon(
    idButton: string,
    classStyleNameButton: string,
    classStyleNameIcon: string,
    textButton: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const button = document.createElement("button");
    const icon = document.createElement("i");

    button.id = idButton;
    document.body.appendChild(button);
    button.className = classStyleNameButton + " " + positionY + " " + positionX;
    button.innerHTML = textButton;

    icon.className = classStyleNameIcon;

    button.appendChild(icon);
  }
}
