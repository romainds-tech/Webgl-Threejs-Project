import { PositionY, PositionX } from "../Enums/Position";

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
      "button_island",
      "ANNULER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "delete_button_item_island",
      "button_island",
      "SUPPRIMER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "button_select_modificate_item_island",
      "button_island",
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
      "button_cartomancie",
      "COMMENCER",
      PositionY.BOTTOM,
      PositionX.CENTER
    );

    this.createButton(
      "button_first_arcane_cartomancie",
      "button_island",
      "Deuxième carte",
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
}
