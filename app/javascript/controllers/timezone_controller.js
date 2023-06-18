import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="timezone"
export default class extends Controller {
  static targets = [
    "startTimeInput",
    "startTimeText",
    "endTimeInput",
    "endTimeText",
    "timezoneSelect",
  ];
  connect() {
    this.show_start_time_info();
    this.show_end_time_info();
    this.modify_timezone_default();
  }
  show_start_time_info() {
    this.show_time_info(this.startTimeInputTarget, this.startTimeTextTarget);
  }
  show_end_time_info() {
    this.show_time_info(this.endTimeInputTarget, this.endTimeTextTarget);
  }
  show_time_info(input_element, text_element) {
    let user_locale = Intl.DateTimeFormat().resolvedOptions().locale;
    text_element.textContent = `${new Date(input_element.value).toLocaleString(
      user_locale,
      {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
    )}`;
  }

  modify_timezone_default() {
    let select_element = this.timezoneSelectTarget;
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (this.modify_select_default(select_element, user_timezone)) {
      return true;
    } else {
      let guess_timezone = Intl.supportedValuesOf("timeZone").filter(
        (timeZone) => {
          const current_time = new Date();
          return (
            current_time.toLocaleString("en-us") ==
            current_time.toLocaleString("en-us", { timeZone: timeZone })
          );
        }
      );
      for (let i, j = 0; (i = select_element.options[j]); j++) {
        if (guess_timezone.includes(i.value)) {
          select_element.selectedIndex = j;
          return true;
        }
      }
      return false;
    }
  }

  modify_select_default(select_element, value_select) {
    for (let i, j = 0; (i = select_element.options[j]); j++) {
      if (i.value == value_select) {
        select_element.selectedIndex = j;
        return true;
      }
    }
    return false;
  }
}
