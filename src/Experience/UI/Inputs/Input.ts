import { PositionX, PositionY } from "../Enums/Position";
export default class Input {
  private static instance: Input;
  constructor() {
    Input.instance = this;
  }

  public static getInstance(): Input {
    if (!Input.instance) {
      Input.instance = new Input();
    }
    return Input.instance;
  }

  public createInput(
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

  public createInputWithSubtitle(
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
