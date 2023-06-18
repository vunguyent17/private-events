document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  change_tab_event();
  let nodes = document.getElementsByName("event[filter]");
  if (nodes !== []) {
    nodes.forEach((node) => {
      node.addEventListener("change", (e) => {
        let url = window.location.href;
        if (url.indexOf("?") > 0) {
          url = url.substring(0, url.indexOf("?"));
        }
        const params = new URLSearchParams({
          eventFilter: e.target.value,
        });
        url += `?${params}`;
        window.location.replace(url);
      });
    });
  }

  function change_tab_event() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventFilter = urlParams.get("eventFilter");
    let tabName = [];
    if (eventFilter) {
      tabName = eventFilter.split("-");
    }
    let tabTrigger;
    if (tabName.length == 0 || tabName[0] == "host") {
      tabTrigger = document.getElementById("v-pills-events-hosted-tab");
    }
    if (tabName[0] == "invited") {
      tabTrigger = document.getElementById("v-pills-events-invited-tab");
    }
    if (tabTrigger != null) {
      let tab = new bootstrap.Tab(tabTrigger);
      tab.show();
    }
  }
});
