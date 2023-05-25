import { PositionX, PositionY } from "../UI/Enums/Position";
import Popup from "../UI/Popups/Popup";
import Button from "../UI/Buttons/Button";

export function displayInterfaceCreationItem() {
  document.getElementById("popup_create_item_island")!.style.display = "block";
  document.getElementById("delete_button_item_island")!.style.display = "block";
}

export function disableInterfaceCreationItem() {
  document.getElementById("popup_create_item_island")!.style.display = "none";
  document.getElementById("delete_button_item_island")!.style.display = "none";
}

export function displayInterfaceInformationItem() {
  document.getElementById("popup_select_item_island")!.style.display = "block";
  document.getElementById(
    "button_select_modificate_item_island"
  )!.style.display = "block";
  document.getElementById("button_disable_select_item_island")!.style.display =
    "block";
}

export function disableInterfaceInformationItem() {
  document.getElementById("popup_select_item_island")!.style.display = "none";
  document.getElementById(
    "button_select_modificate_item_island"
  )!.style.display = "none";
  document.getElementById("button_disable_select_item_island")!.style.display =
    "none";
}

export function displayPopupIterfaceModificateItem() {
  document.getElementById("popup_modification_item_island")!.style.display =
    "block";
  document.getElementById(
    "abandonned_modificate_item_position_island"
  )!.style.display = "block";
}

export function disablePopupIterfaceModificateItem() {
  document.getElementById("popup_modification_item_island")!.style.display =
    "none";
  document.getElementById(
    "abandonned_modificate_item_position_island"
  )!.style.display = "none";
}

export function onClickOnDisabledModificationButton() {
  document
    .getElementById("abandonned_modificate_item_position_island")!
    .addEventListener("click", () => {
      disablePopupIterfaceModificateItem();
    });
}

export function createUIIsland() {
  // POPUP
  Popup.getInstance().createPopupTextOnly(
    "popup_modification_item_island",
    "div div_popup",
    "Sélectionnez un emplacement où déplacer votre objet",
    "island_title",
    PositionY.TOP
  );

  Popup.getInstance().createPopupTextOnly(
    "popup_create_item_island",
    "div div_popup",
    "Selectionnez un emplacement où placer votre objet.",
    "island_title",
    PositionY.TOP
  );

  Popup.getInstance().createPopupTextOnly(
    "popup_select_item_island",
    "div div_popup",
    "description du grigri + date d’obtention ",
    "island_title",
    PositionY.TOP_70
  );

  // BUTTONS
  Button.getInstance().createButton(
    "abandonned_modificate_item_position_island",
    "button button_island",
    "ANNULER",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "delete_button_item_island",
    "button button_island",
    "SUPPRIMER",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "button_select_modificate_item_island",
    "button button_island",
    "DEPLACER",
    PositionY.BOTTOM,
    PositionX.CENTER
  );

  Button.getInstance().createButton(
    "button_disable_select_item_island",
    "button_cross_island",
    "X",
    PositionY.TOP,
    PositionX.RIGHT
  );
}
