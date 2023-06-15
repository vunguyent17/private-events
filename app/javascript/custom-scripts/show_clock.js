window.addEventListener("turbo:load", function (e) {
  e.preventDefault();
  function showTime() {
    let date = new Date();

    document.getElementById("dateNow").innerText = date.toDateString();
    document.getElementById("timeNow").innerText = date.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    document.getElementById("timezoneNow").innerText = date
      .toTimeString()
      .split(" ")[1];

    setTimeout(showTime, 1000);
  }

  showTime();
});
