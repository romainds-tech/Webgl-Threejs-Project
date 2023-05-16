import { PositionX, PositionY } from "../Enums/Position";

export default class Input {
  constructor() {}

  setInputCartomancie() {
    this.createInput(
      "title_start_cartomancie",
      "title_cartomancie",
      "Découvrir votre rédiction du jour",
      PositionY.TOP,
      PositionX.CENTER
    );

    this.createInput(
      "title_first_arcane_cartomancie",
      "title_cartomancie",
      "L’arcane majeur",
      PositionY.TOP,
      PositionX.CENTER
    );
  }
  createInput(
    idInput: string,
    classStyleNameInput: string,
    textInput: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const input = document.createElement("h2");
    input.id = idInput;
    input.className = classStyleNameInput + " " + positionY + " " + positionX;
    input.innerHTML = textInput;

    document.body.appendChild(input);
  }
}
