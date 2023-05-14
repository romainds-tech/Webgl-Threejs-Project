import { Object3D, Event, Scene } from "three";

export function displayInterfaceInformationItem(object: Object3D<Event>) {
  console.log("ojihjiji");

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

export function clickOnMoveItemButton(canRaycast: boolean) {
  document
    .getElementById("button_select_modificate_item_island")!
    .addEventListener("click", () => {
      displayPopupIterfaceModificateItem();
      disableInterfaceInformationItem();
      console.log("deplacer button");

      canRaycast = true;
    });
}

export function clickOnCrossButtonInformationItem(model: Object3D<Event>) {
  document
    .getElementById("button_disable_select_item_island")!
    .addEventListener("click", () => {
      disableInterfaceInformationItem();
      console.log("cross button");
      model.position.y = 0;
    });
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
