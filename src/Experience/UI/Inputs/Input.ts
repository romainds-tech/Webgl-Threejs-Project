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

  public createInputRings(
    idInput: string,
    classStyleDivName: string,
    srcPictoLeft: string,
    srcPictCenter: string,
    srcPictoRight: string,
    textLeft: string,
    percentLeft: string,
    idPercentLeft: string,
    textCenter: string,
    percentCenter: string,
    idPercentCenter: string,
    textRight: string,
    percentRight: string,
    idPercentRight: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const divContent = document.createElement("div");
    const divLeft = document.createElement("div");
    const divCenter = document.createElement("div");
    const divRight = document.createElement("div");

    const imageLeft = document.createElement("img");
    const imageCenter = document.createElement("img");
    const imageRight = document.createElement("img");
    divContent.id = idInput;
    divContent.className =
      classStyleDivName + " " + positionY + " " + positionX;

    const inputTextLeft = document.createElement("h4");
    inputTextLeft.innerHTML = textLeft;
    const inputPercentLeft = document.createElement("h2");
    inputPercentLeft.innerHTML = percentLeft;
    inputPercentLeft.id = idPercentLeft;

    imageLeft.src = srcPictoLeft;

    const inputTextCenter = document.createElement("h4");
    inputTextCenter.innerHTML = textCenter;
    const inputPercentCenter = document.createElement("h2");
    inputPercentCenter.innerHTML = percentCenter;
    inputPercentCenter.id = idPercentCenter;
    imageCenter.src = srcPictCenter;

    const inputTextRight = document.createElement("h4");
    inputTextRight.innerHTML = textRight;
    const inputPercentRight = document.createElement("h2");
    inputPercentRight.innerHTML = percentRight;
    inputPercentRight.id = idPercentRight;
    imageRight.src = srcPictoRight;

    divLeft.appendChild(imageLeft);
    divLeft.appendChild(inputTextLeft);
    divLeft.appendChild(inputPercentLeft);
    divCenter.appendChild(imageCenter);
    divCenter.appendChild(inputTextCenter);
    divCenter.appendChild(inputPercentCenter);
    divRight.appendChild(imageRight);
    divRight.appendChild(inputTextRight);
    divRight.appendChild(inputPercentRight);

    divContent.appendChild(divLeft);
    divContent.appendChild(divCenter);
    divContent.appendChild(divRight);
    document.body.appendChild(divContent);
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
    div.className =
      "input_div color_text_div" + " " + positionY + " " + positionX;
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
