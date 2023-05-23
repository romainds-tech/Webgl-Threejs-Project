import { PositionX, PositionY } from "../Enums/Position";
import { sub } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

export default class Input {
  constructor() {}

  setInputCartomancie() {
    this.createInput(
      "title_start_cartomancie",
      "title_cartomancie",
      "Découvrir votre prédiction du jour",
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

    this.createInput(
      "title_second_arcane_cartomancie",
      "title_cartomancie",
      "L’arcane mineur",
      PositionY.TOP,
      PositionX.CENTER
    );

    this.createInputWithSubtitle(
      "title_prediction_cartomancie",
      "title_prediction_cartomancie",
      "Prédiciton du xx/xx/xxxx",
      "subtitle_cartomancie",
      "CARTOMANCIE",
      PositionY.TOP,
      PositionX.CENTER
    );

    this.createInputWithSubtitle(
      "title_select_item_cartomancie",
      "title_prediction_cartomancie",
      "CHOISISSEZ VOTRE AMULETTE",
      "subtitle_cartomancie",
      "Vous pourrez ensuite la placer sur votre île",
      PositionY.TOP_10,
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

  createInputWithSubtitle(
    idInput: string,
    classStyleNameInput: string,
    textInput: string,
    classStyleSubstitleInput: string,
    textSubtitle: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const div = document.createElement("div");
    const input = document.createElement("h2");
    div.id = idInput;
    div.className = "input_div" + " " + positionY + " " + positionX;
    input.className = classStyleNameInput;
    input.innerHTML = textInput;

    const subtitle = document.createElement("h4");
    subtitle.innerHTML = textSubtitle;
    subtitle.className = classStyleSubstitleInput;

    div.appendChild(input);
    div.appendChild(subtitle);
    document.body.appendChild(div);
  }
}
