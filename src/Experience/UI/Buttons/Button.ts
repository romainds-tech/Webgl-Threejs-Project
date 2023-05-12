import { Position } from "../Enums/Position";

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
      "test",
      Position.BOTTOM
    );
  }

  createButton(
    idButton: string,
    classStyleNameButton: string,
    textButton: string,
    position: Position
  ) {
    const button = document.createElement("button");
    button.id = idButton;
    button.className = classStyleNameButton + " " + position;
    button.innerHTML = textButton;

    document.body.appendChild(button);
  }
}
