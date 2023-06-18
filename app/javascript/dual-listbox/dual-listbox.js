window.addEventListener("turbo:load", dualListboxScripts);
dualListboxScripts();

function dualListboxScripts() {
  if (document.querySelector("#event-form")!== null)
  {
    addSearchActions();
    addButtonActions();
    addSubmitAction ();
  }  
}
function addSubmitAction (){
  let formEvent = document.querySelector("#event-form");
  formEvent.addEventListener("submit", (e) => submitEventForm (e));
}

function submitEventForm (e) {
  let guestEl = document.getElementById("event_guest_ids");
  guestEl.childNodes.forEach((node) => {
    if (node.nodeName == "OPTION") {
      node.selected = "selected";
    }
  });
  return true;
};

function addSearchActions() {
  let search_left = document.getElementById("searchleft");
  search_left.addEventListener("change", (t) =>
    searchListsLeft(t.target.value)
  );
    search_left.addEventListener("keyup", (t) =>
      searchListsLeft(t.target.value)
    );
    
}

function searchListsLeft(targetValue) {
  const xhttp = new XMLHttpRequest();

  let url = window.location.href;
  if (url.indexOf("?") > 0) {
    url = url.substring(0, url.indexOf("?"));
  }
  const FD = new FormData();

  let dataAtbt = {
    "data-turbo-stream": "username-list",
  };

  for (const [name, value] of Object.entries(dataAtbt)) {
    FD.append(name, value);
  }

  const params = new URLSearchParams({
    query: targetValue,
  });
  url += `?${params}`;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200 && targetValue != "") {
      Turbo.renderStreamMessage(xhttp.responseText);
    }
  };
  xhttp.open("GET", url);
  xhttp.send(FD);
}



function addButtonActions() {
  let add_button = document.getElementById("addbtn");
  let remove_button = document.getElementById("removebtn");
  let remove_all_button = document.getElementById("removeAllbtn");
  add_button.addEventListener("click", (t) => actionItemSelected(t)),
    remove_button.addEventListener("click", (t) => actionItemDeselected(t)),
    remove_all_button.addEventListener("click", (t) => actionAllDeselected(t));
}

function actionItemSelected(t) {
  t.preventDefault();
  let searchResultEl = document.querySelector("#event_user_search");

  let guestEl = document.getElementById("event_guest_ids");
  let selectedOpt = getSelectOptions(searchResultEl);
  selectedOpt.forEach((opt) => {
    guestEl.appendChild(opt);
    searchResultEl.childNodes.forEach((node) => {
      if (node.nodeName == "OPTION" && opt.value == node.value) {
        searchResultEl.removeChild(node);
      }
    });
  });
}
function actionItemDeselected(t) {
  t.preventDefault();
  let guestEl = document.querySelector("#event_guest_ids");
  let selectedOpt = getSelectOptions(guestEl);
  selectedOpt.forEach((opt) => {
    guestEl.childNodes.forEach((node) => {
      if (node.nodeName == "OPTION" && opt.value == node.value) {
        guestEl.removeChild(node);
      }
    });
  });
}

function actionAllDeselected(t) {
  t.preventDefault();
  let guestEl = document.getElementById("event_guest_ids");
  guestEl.replaceChildren();
}

function getSelectOptions(select) {
  var result = [];
  var options = select.childNodes;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt);
    }
  }
  return result;
}
