import Search from "./scripts/search";
import "Bootstrap";
import * as $ from "jquery";
import AlertMagic from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

function newEvent(title, imgUrl, place, link) {
  const tempCard = $(`
  <div class="col">
  <div class="card mb-3 mr-1">
    <div class="card-body">
      <h3 class="card-title text-center">${title}</h3>
      <hr>
      <img class="card-img" src="${imgUrl}">
      <hr>
      <h5 class="card-text text-wrap text-center">Venue: ${place}</h5>
      <div class="w-25 m-auto">
        <a href="${link}" class="text-center btn btn-primary">Info and price</a>
      </div>
    </div>
  </div>
</div>
  `);
  return tempCard;
}

document.querySelector('form').addEventListener("submit", (event) => {
  event.preventDefault();
  let city1 = document.getElementById("city").value;
  let state1 = document.getElementById("state").value;
  const searchVar = new Search(city1, state1, "Music");
  const events = searchVar.events();
  events.then((res) => {
    if (res) {
      console.log(res);
      res.forEach((ev) => {
        const name = ev.name;
        const img = ev.images[0].url;
        const venue = ev._embedded.venues[0].name;
        const sales = ev.url;
        const evCard = newEvent(name, img, venue, sales);
        evCard.appendTo("#event-box");
      });
    } else {
      AlertMagic.fire({
        title: "Oh No!!",
        text: "Unknown city or state",
        icon: "error",
        confirmButtonText: "ok then"
      });
    }
  });
});