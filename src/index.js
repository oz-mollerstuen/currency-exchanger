import Search from "./scripts/search";
import "Bootstrap";
import "animate.css";
import * as $ from "jquery";
import AlertMagic from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

HTMLElement.prototype.removeAll = function() {
  while (this.lastChild) {
    this.removeChild(this.lastChild);
  }
};

function newEvent(title, imgUrl, place, date, link) {
  const tempCard = $(`
  <div class="col">
  <div class="card mb-3 mr-1 animate__animated animate__zoomInDown">
    <div class="card-body">
      <h3 class="card-title text-center">${title}</h3>
      <hr>
      <img class="card-img" src="${imgUrl}">
      <hr>
      <h5 class="card-text text-wrap text-center">Venue: ${place}</h5>
      <h5 class="card-text text-wrap text-center">${date[1]}-${date[2]} ${date[0]}</h5>
      <div class="w-25 m-auto">
        <a href="${link}" class="text-center btn btn-primary">Info and price</a>
      </div>
    </div>
  </div>
</div>
  `);
  return tempCard;
}

function showError(msg) {
  return AlertMagic.fire({
    title: "Oh No!!",
    text: msg,
    icon: "error",
    confirmButtonText: "ok then"
  });
}

async function showInfo() {
  0;
}

async function showEvents() {
  let city1 = document.getElementById("city").value;
  let state1 = document.getElementById("state").value;
  let eType = document.getElementById("eType").value;
  const searchVar = new Search(city1, state1, eType);
  const events = searchVar.events();
  return new Promise((resolve) => {
    events.then((res) => {
      if (res) {
        console.log(res);
        document.getElementById("event-box").removeAll();
        res.forEach((ev) => {
          const name = ev.name;
          const img = ev.images[0].url;
          const venue = ev._embedded.venues[0].name;
          const date = ev.dates.start.localDate.split("-");
          const sales = ev.url;
          const evCard = newEvent(name, img, venue, date, sales);
          evCard.appendTo("#event-box");
        });
        resolve(true);
      }
      resolve(false);
    });
  });
}

document.querySelector('form').addEventListener("submit", (event) => {
  event.preventDefault();
  showInfo()
    .then((good) => {
      if (!good) {
        showError("An error has occured while fetching news info :(");
      }
    });
  showEvents()
    .then((good) => {
      if (!good) {
        showError("An error has occured while fetching event info :(");
      }
    });
});