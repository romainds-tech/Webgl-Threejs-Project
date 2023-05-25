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
        styleClass = "title_text top_10_position";
        break;
      case typeText.TEXT:
        styleClass = "text top_20_position";
        break;
      case typeText.TEXT_MAJ:
        styleClass = "text_maj";
        break;
    }

    styleClass += " " + "text center_position";

    text.className = styleClass;
    text.id = this.typeText.toString();
    text.innerHTML = this.text;
    document.body.appendChild(text);
  }

  destroy() {
    let text = document.querySelector(".text");
    if (text) {
      text.remove();
    }
  }
}
