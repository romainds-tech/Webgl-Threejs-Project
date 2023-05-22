import { typeText } from "../Enums/Text";

export default class Text {
  private text: string;
  private typeText: typeText;

  constructor(text: string, typeText: typeText) {
    this.text = text;
    this.typeText = typeText;
    this.init();
  }

  init() {
    let text = document.createElement("div");
    let styleClass: string = "";

    switch (this.typeText) {
      case typeText.TITLE:
        styleClass = "title_text";
        break;
      case typeText.TEXT:
        styleClass = "text";
        break;
      case typeText.TEXT_MAJ:
        styleClass = "text_maj";
        break;
    }

    text.className = "text" + " " + styleClass;
    text.id = this.typeText.toString();
    text.innerHTML = this.text;
    document.querySelector("#interactions")?.appendChild(text);
  }

  destroy() {
    let text = document.querySelector(".text");
    if (text) {
      text.remove();
    }
  }
}
