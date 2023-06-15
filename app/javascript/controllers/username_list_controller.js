import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="username-list"
export default class extends Controller {
  static targets = ["filterable"];
  connect() {
    let selectedValues = this.getSelectValues();
    this.filterableTargets[0].childNodes.forEach((node) => {
      if (node.nodeName == "OPTION" && selectedValues.includes(node.value)) {
        this.filterableTargets[0].removeChild(node);
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

  // filter(event) {
  //   let lowerCaseFilterTerm = this.sourceTarget.value.toLowerCase()

  //   this.filterableTargets.forEach((el, i) => {
  //     let filterableKey =  el.getAttribute("data-filter-key")

  //     el.classList.toggle("filter--notFound", !filterableKey.includes( lowerCaseFilterTerm ) )
  //   })
}
