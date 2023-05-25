import { PositionX, PositionY } from "../UI/Enums/Position";
import Button from "../UI/Buttons/Button";
import Popup from "../UI/Popups/Popup";
import Input from "../UI/Inputs/Input";
import Overlay from "../UI/Overlays/Overlay";

export function displayInterfaceStartCartomancie() {
  document.getElementById("popup_start_cartomancie")!.style.display = "block";
  document.getElementById("button_start_cartomancie")!.style.display = "block";
  document.getElementById("title_start_cartomancie")!.style.display = "block";
  document.getElementById("overlay_start_cartomancie")!.style.display = "block";
}

export function disabledInterfaceStartCartomancie() {
  document.getElementById("popup_start_cartomancie")!.style.display = "none";
  document.getElementById("button_start_cartomancie")!.style.display = "none";
  document.getElementById("title_start_cartomancie")!.style.display = "none";
  document.getElementById("overlay_start_cartomancie")!.style.display = "none";
}

export function displayInterfaceFirstArcaneCartomancie() {
  document.getElementById("popup_first_arcane_cartomancie")!.style.display =
    "block";
  document.getElementById("title_first_arcane_cartomancie")!.style.display =
    "block";
  document.getElementById("button_first_arcane_cartomancie")!.style.display =
    "block";
  // document.getElementById("overlay_arcane")!.style.display = "block";
}

export function disabledInterfaceFirstArcaneCartomancie() {
  document.getElementById("popup_first_arcane_cartomancie")!.style.display =
    "none";
  document.getElementById("title_first_arcane_cartomancie")!.style.display =
    "none";
  document.getElementById("button_first_arcane_cartomancie")!.style.display =
    "none";
  // document.getElementById("overlay_arcane")!.style.display = "block";
}

export function displayInterfaceSecondArcaneCartomancie() {
  document.getElementById("button_second_arcane_cartomancie")!.style.display =
    "block";
  document.getElementById("popup_second_arcane_cartomancie")!.style.display =
    "block";
  document.getElementById("title_second_arcane_cartomancie")!.style.display =
    "block";
}

export function disabledInterfaceSecondArcaneCartomancie() {
  document.getElementById("button_second_arcane_cartomancie")!.style.display =
    "none";
  document.getElementById("popup_second_arcane_cartomancie")!.style.display =
    "none";
  document.getElementById("title_second_arcane_cartomancie")!.style.display =
    "none";
}

export function displayInterfacePredictionCartomancie() {
  document.getElementById(
    "button_display_prediction_cartomancie"
  )!.style.display = "block";
  document.getElementById("title_prediction_cartomancie")!.style.display =
    "block";
  document.getElementById("popup_prediction_cartomancie")!.style.display =
    "block";
}

export function disabledInterfacePredictionCartomancie() {
  document.getElementById(
    "button_display_prediction_cartomancie"
  )!.style.display = "none";
  document.getElementById("title_prediction_cartomancie")!.style.display =
    "none";
  document.getElementById("popup_prediction_cartomancie")!.style.display =
    "none";
}

export function displayInterfaceSelectItemCartomancie() {
  document.getElementById("button_back_cartomancie")!.style.display = "flex";
  document.getElementById("title_select_item_cartomancie")!.style.display =
    "block";
  document.getElementById(
    "button_select_answer_question_item_cartomancie"
  )!.style.display = "block";
  document.getElementById(
    "button_select_paid_item_cartomancie"
  )!.style.display = "flex";
}

export function disabledInterfaceSelectItemCartomancie() {
  document.getElementById("button_back_cartomancie")!.style.display = "none";
  document.getElementById("title_select_item_cartomancie")!.style.display =
    "none";
  document.getElementById(
    "button_select_answer_question_item_cartomancie"
  )!.style.display = "none";
  document.getElementById(
    "button_select_paid_item_cartomancie"
  )!.style.display = "none";
}

export function createUICartomancie() {
  // OVERLAY
  Overlay.getInstance().createOverlay(
    "overlay_start_cartomancie",
    "overlay_cartomancie all_ui_cartomancie"
  );

  //TEXTES
  Input.getInstance().createInput(
    "title_start_cartomancie",
    "title_cartomancie all_ui_cartomancie",
    "Découvrir votre prédiction du jour",
    PositionY.TOP,
    PositionX.CENTER
  );

  Input.getInstance().createInput(
    "title_first_arcane_cartomancie",
    "title_cartomancie all_ui_cartomancie",
    "L’arcane majeur",
    PositionY.TOP,
    PositionX.CENTER
  );

  Input.getInstance().createInput(
    "title_second_arcane_cartomancie",
    "title_cartomancie all_ui_cartomancie",
    "L’arcane mineur",
    PositionY.TOP,
    PositionX.CENTER
  );

  Input.getInstance().createInputWithSubtitle(
    "title_prediction_cartomancie",
    "title_prediction_cartomancie all_ui_cartomancie",
    "Prédiciton du xx/xx/xxxx",
    "subtitle_cartomancie all_ui_cartomancie",
    "CARTOMANCIE",
    PositionY.TOP,
    PositionX.CENTER
  );

  Input.getInstance().createInputWithSubtitle(
    "title_select_item_cartomancie",
    "title_prediction_cartomancie all_ui_cartomancie",
    "CHOISISSEZ VOTRE AMULETTE",
    "subtitle_cartomancie all_ui_cartomancie",
    "Vous pourrez ensuite la placer sur votre île",
    PositionY.TOP_10,
    PositionX.CENTER
  );

  // POPUPS
  Popup.getInstance().createPopupTextOnly(
    "popup_start_cartomancie",
    "div div_popup all_ui_cartomancie",
    "Votre prédiction du jour provient de la\n" +
      "cartomancie\n" +
      "<br>" +
      "<br>" +
      "Cet art consiste en une pratique divinatoire qui utilise les cartes pour obtenir des informations ou des prédictions sur vos événements passés, présents ou futurs, ainsi que sur des aspects de votre vie.",
    "cartomancie_text all_ui_cartomancie",
    PositionY.MIDDLE
  );

  Popup.getInstance().createPopupTextOnly(
    "popup_first_arcane_cartomancie",
    "div div_arcane all_ui_cartomancie",
    "",
    "text_arcane",
    PositionY.TOP_70
  );

  Popup.getInstance().createPopupTextOnly(
    "popup_second_arcane_cartomancie",
    "div div_arcane all_ui_cartomancie",
    "",
    "text_arcane",
    PositionY.TOP_70
  );

  Popup.getInstance().createPopupTextOnly(
    "popup_prediction_cartomancie",
    "div div_arcane div_prediction all_ui_cartomancie",
    "",
    "text_arcane height_arcane",
    PositionY.TOP_55
  );

  // BUTTONS
  Button.getInstance().createButton(
    "button_start_cartomancie",
    "button button_cartomancie all_ui_cartomancie",
    "COMMENCER",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "button_first_arcane_cartomancie",
    "button button_prediction all_ui_cartomancie",
    "DEUXIÈME CARTE",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButtonWithIcon(
    "button_second_arcane_cartomancie",
    "button button_prediction all_ui_cartomancie",
    "fa fa-arrow-right margin_icon_right",
    "MA PRÉDICTION",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "button_display_prediction_cartomancie",
    "button button_prediction all_ui_cartomancie",
    "DÉCOUVRIR MON AMULETTE",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButtonWithIcon(
    "button_back_cartomancie",
    "button button_prediction_back button_icon_back all_ui_cartomancie",
    "fa fa-arrow-left margin_icon_left",
    "RETOUR",
    PositionY.TOP,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "button_select_answer_question_item_cartomancie",
    "button button_white all_ui_cartomancie",
    "RÉPONDRE À UNE QUESTION",
    PositionY.TOP_70,
    PositionX.CENTER
  );

  Button.getInstance().createButtonWithIcon(
    "button_select_paid_item_cartomancie",
    "button little_width button_prediction button_icon_back all_ui_cartomancie",
    "fa fa-lock margin_icon_left",
    "2.99 €",
    PositionY.TOP_60,
    PositionX.CENTER
  );
}

export function deleteAllUI() {
  document.querySelectorAll(".all_ui_cartomancie").forEach((ui) => {
    ui.remove();
  });

  document.getElementById("title_select_item_cartomancie")!.remove();
  document.getElementById("title_prediction_cartomancie")!.remove();
}
