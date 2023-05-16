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
