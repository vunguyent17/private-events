
window.addEventListener("turbo:load", setTimezone);
setTimezone();

function setTimezone() {
  if (
    document.getElementById("newEventTitle") !== null ||
    document.getElementById("editEventTitle") !== null
  ) {
    modify_timezone_default();
    show_time_info("event_start_time", "show_start_time");
    show_time_info("event_end_time", "show_end_time");
  }
}

function show_time_info(input_element_id, text_element_id) {
  let input_element = document.getElementById(input_element_id);
  if (input_element == null) return;
  let user_locale = Intl.DateTimeFormat().resolvedOptions().locale;
  input_element.addEventListener("change", (e) => {
    e.preventDefault();
    document.getElementById(text_element_id).textContent = `${new Date(
      e.target.value
    ).toLocaleString(user_locale, {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })}`;
  });
  input_element.dispatchEvent(new Event("change"));
}

function modify_timezone_default() {
  let select_element = document.getElementById("event_time_zone");
  if (!select_element) return false;
  let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (modify_select_default(select_element, user_timezone)) {
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

function modify_select_default(select_element, value_select) {
  for (let i, j = 0; (i = select_element.options[j]); j++) {
    if (i.value == value_select) {
      select_element.selectedIndex = j;
      return true;
    }
  }
  return false;
}
