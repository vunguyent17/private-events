import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="clock"
export default class extends Controller {
  static targets = ["time", "date", "timezone"];
  connect() {
    this.showTime();
  }
  showTime() {
    let date = new Date();
    if (this.dateTarget && this.timeTarget && this.timezoneTarget) {
      this.dateTarget.innerText = date.toDateString();
      this.timeTarget.innerText = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.timezoneTarget.innerText = date.toTimeString().split(" ")[1];
    }
    setTimeout(this.showTime, 1000);
  }
}
