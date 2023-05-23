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
