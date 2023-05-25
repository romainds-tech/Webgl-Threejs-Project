import Button from "../UI/Buttons/Button";
import { PositionX, PositionY } from "../UI/Enums/Position";

export function displayButtonsSky() {
  document.getElementById("button_rings_island")!.style.display = "block";
}

export function disableButtonsSky() {
  document.getElementById("button_rings_island")!.style.display = "none";
}
export function createUISky() {
  Button.getInstance().createButtonWithImage(
    "button_back_island_sky",
    "button button_just_image",
    "/public/images/island_button.png",
    "button_island_sky",
    "",
    PositionY.BOTTOM,
    PositionX.CENTER
  );
}
