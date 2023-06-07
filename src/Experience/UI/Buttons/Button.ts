import { PositionX, PositionY } from "../Enums/Position";

export default class Button {
  private static instance: Button;
  constructor() {
    Button.instance = this;
  }

  public static getInstance() {
    if (!Button.instance) {
      Button.instance = new Button();
    }
    return Button.instance;
  }

  setButtonOnboarding() {
    this.createButton(
      "button_onboarding",
      "button_prediction button",
      "Suivant",
      PositionY.BOTTOM,
      PositionX.CENTER
    );
  }

  public createButton(
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

  public createTwoButton(
    idDiv: string,
    idButtonLeft: string,
    idButtonRight: string,
    classStyleNameButton: string,
    textButtonLeft: string,
    textButtonRight: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const div = document.createElement("div");
    div.id = idDiv;
    div.className = positionY + " " + positionX;

    const buttonLeft = document.createElement("button");
    buttonLeft.id = idButtonLeft;
    buttonLeft.className =
      classStyleNameButton + " " + positionY + " " + positionX;
    buttonLeft.innerHTML = textButtonLeft;

    const buttonRight = document.createElement("button");
    buttonRight.id = idButtonRight;
    buttonRight.className = classStyleNameButton;
    buttonRight.innerHTML = textButtonRight;

    document.body.appendChild(div);
    div.appendChild(buttonLeft);
    div.appendChild(buttonRight);
  }

  public createButtonWithIcon(
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

  public createButtonWithImage(
    idButton: string,
    classStyleNameButton: string,
    srcImg: string,
    classStyleNameImg: string,
    textButton: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.id = idButton;
    document.body.appendChild(button);
    button.className = classStyleNameButton + " " + positionY + " " + positionX;
    button.innerHTML = textButton;

    image.className = classStyleNameImg;
    image.src = srcImg;

    button.appendChild(image);
  }

  public createButtonWithImageAndIcon(
    idButton: string,
    classStyleNameButton: string,
    srcImg: string,
    classStyleNameImg: string,
    textButton: string,
    classStyleNameIcon: string,
    positionY: PositionY,
    positionX: PositionX
  ) {
    const button = document.createElement("button");
    const image = document.createElement("img");

    const icon = document.createElement("i");

    button.id = idButton;
    document.body.appendChild(button);
    button.className = classStyleNameButton + " " + positionY + " " + positionX;
    button.innerHTML = textButton;

    image.className = classStyleNameImg;
    image.src = srcImg;

    icon.className = classStyleNameIcon;

    button.appendChild(icon);

    button.appendChild(image);
  }
}
