import Button from "../UI/Buttons/Button";
import { PositionX, PositionY } from "../UI/Enums/Position";
import Input from "../UI/Inputs/Input";
import Popup from "../UI/Popups/Popup";
import Overlay from "../UI/Overlays/Overlay";

export function displayPredicitonSky() {
  document.getElementById("title_last_prediction_sky")!.style.display = "block";
  document.getElementById("popup_last_prediction_sky")!.style.display = "block";
  document.getElementById("button_return_rings_sky")!.style.display = "block";
  document.getElementById("overlay_prediciton_sky")!.style.display = "block";

  document.getElementById("title_sky")!.style.display = "none";
  document.getElementById("div_rings_values")!.style.display = "none";
  document.getElementById("button_show_last_prediction_sky")!.style.display =
    "none";
  document.getElementById("button_back_island_sky")!.style.display = "none";
}

export function disablePredictionSky() {
  document.getElementById("title_last_prediction_sky")!.style.display = "none";
  document.getElementById("popup_last_prediction_sky")!.style.display = "none";
  document.getElementById("button_return_rings_sky")!.style.display = "none";
  document.getElementById("overlay_prediciton_sky")!.style.display = "none";

  document.getElementById("title_sky")!.style.display = "block";
  document.getElementById("div_rings_values")!.style.display = "flex";
  document.getElementById("button_show_last_prediction_sky")!.style.display =
    "block";
  document.getElementById("button_back_island_sky")!.style.display = "block";
}

export function displayRingsSky() {}

export function disableRingsSky() {}

export function createUISky() {
  // OVERLAY
  Overlay.getInstance().createOverlay(
    "overlay_prediciton_sky",
    "overlay overlay_sky all_ui_sky"
  );

  // TEXTES
  Input.getInstance().createInput(
    "title_sky",
    "title_cartomancie title all_ui_sky",
    "Votre score astral",
    PositionY.TOP,
    PositionX.CENTER
  );

  Input.getInstance().createInputRings(
    "div_rings_values",
    "input_div all_ui_sky",
    "/images/grand_cercle.png",
    "/images/moyen_cercle.png",
    "/images/petit_cercle.png",
    "AMOUR",
    "0%",
    "id_percent_left_ring",
    "PROSPÉRITÉ",
    "0%",
    "id_percent_center_ring",
    "ÉTUDE",
    "0%",
    "id_percent_right_ring",
    PositionY.TOP_15,
    PositionX.CENTER
  );

  Input.getInstance().createInputWithSubtitle(
    "title_last_prediction_sky",
    "title_prediction_cartomancie all_ui_sky",
    // @ts-ignore
    `Prédiction du ${new Date().toLocaleDateString()}`,
    "subtitle_cartomancie all_ui_sky",
    "CARTOMANCIE",
    PositionY.TOP_20,
    PositionX.CENTER
  );

  // POPUP

  Popup.getInstance().createPopupTextOnly(
    "popup_last_prediction_sky",
    "div div_arcane all_ui_sky",
    "predicition",
    "text_arcane height_arcane",
    PositionY.TOP_50
  );

  // const divContainer = document.createElement("div");
  // const titleH2 = document.createElement("h4");
  //
  // divContainer.id = "popup_last_prediction_sky";
  // divContainer.className =
  //   "div div_arcane div_prediction all_ui_sky " + PositionY.TOP_55;
  //
  // titleH2.innerHTML = "predicition";
  // titleH2.className = "text_arcane height_arcane";
  //
  // document.body.appendChild(divContainer);
  // divContainer.appendChild(titleH2);

  // BUTTONS

  Button.getInstance().createButtonWithIcon(
    "button_show_last_prediction_sky",
    "button button_white all_ui_sky",
    "fa fa-arrow-right margin_icon_right",
    "VOTRE DERNIÈRE PRÉDICITION",
    PositionY.TOP_80,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "button_return_rings_sky",
    "button big_button button_prediction all_ui_sky",
    "RETOURNER VOIR MES STATS",
    PositionY.TOP_80,
    PositionX.CENTER
  );

  Button.getInstance().createButtonWithImageAndIcon(
    "button_back_island_sky",
    "button button_just_image item_below all_ui_sky",
    "/images/island_button.png",
    "button_island_sky",
    "",
    "fa fa-arrow-down",
    PositionY.BOTTOM,
    PositionX.CENTER
  );
}

export function deleteUISky() {
  document.querySelectorAll(".all_ui_sky").forEach((element) => {
    element.remove();
  });

  document.getElementById("title_last_prediction_sky")!.remove();
}
