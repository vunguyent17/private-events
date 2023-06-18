import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="guest-filter"
export default class extends Controller {
  static targets = ["source", "filterable"];
  connect() {}

  filter(event) {
    let lowerCaseFilterTerm = this.sourceTarget.value.toLowerCase();

    this.filterableTarget.childNodes.forEach((node) => {
      if (node.nodeName == "OPTION") {
        let filterableText = node.textContent;
        node.classList.toggle(
          "d-none",
          !filterableText.includes(lowerCaseFilterTerm)
        );
      }
    });
  }
}
