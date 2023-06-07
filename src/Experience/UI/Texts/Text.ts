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
        styleClass = "title_text top_20_position";
        break;
      case typeText.TEXT:
        styleClass = "text text_style top_30_position";
        break;
      case typeText.TEXT_MAJ:
        styleClass = "text_maj";
        break;
      case typeText.STEP:
        styleClass = "top_10_position step";
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
