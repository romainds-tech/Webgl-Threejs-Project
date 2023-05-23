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
