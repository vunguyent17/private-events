import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="username-list"
export default class extends Controller {
  static targets = ["filterable"];
  connect() {
    let selectedValues = this.getSelectValues();
    this.filterableTarget.childNodes.forEach((node) => {
      if (node.nodeName == "OPTION" && selectedValues.includes(node.value)) {
        this.filterableTarget.removeChild(node);
      }
    });
  }
  getSelectValues() {
    let guestEl = document.getElementById("event_guest_ids");
    let result = [];
    let options = guestEl.childNodes;
    let opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value);
      }
    }
    return result;
  }
}
