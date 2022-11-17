// IMPORTS

// scripts
import Events from "./scripts/events";
import Weather from "./scripts/weather";
import News from "./scripts/news";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// named module imports
import * as $ from "jquery";
import AlertMagic from "sweetalert2";
import feather from "feather-icons";

// module imports
import "Bootstrap";
import "animate.css";


// UTILS
HTMLElement.prototype.removeAll = function() {
  while (this.lastChild) {
    this.removeChild(this.lastChild);
  }
};

function fetchError(thing) {
  return AlertMagic.fire({
    title: "Oh No!!",
    text: `An error has occured while fetching ${thing} info :(`,
    icon: "error",
    confirmButtonText: "ok then"
  });
}

// ELEMENTS

// Temp elements
function newTempElement(temp, city, state) {
  const tempElement = $(`
  <h1 class="display-5">${city}, ${state}</h1>
  <h4><span><i data-feather="thermometer"></i></span><span id="degrees">${temp}</span>°F</h4>
  `);
  return tempElement;
}

async function showTemp(city, state) {
  return new Promise((resolve) => {
    const tempVar = new Weather(city, state);
    const getTemp = tempVar.temp();
    getTemp.then((temp) => {
      if (temp) {
        console.log(temp);
        document.getElementById("temp-box").removeAll();
        newTempElement(temp, city, state).appendTo("#temp-box");
        feather.replace();
        resolve(true);
      }  else {
        document.getElementById("jumbo-box").classList.add("invisible");
        resolve(false);
      }
    });
  });
}

// News elements
function newsElements(title, img, source) {
  const nElm = $(`
  <h4>${title}</h4>
  <img class="card-img" src="${img}">
  <a class="btn btn-primary mt-2" href="${source}">Source</a>
  `);
  return nElm;
}

async function showNews(eType) {
  return new Promise((resolve) => {
    const newsVar = new News(eType);
    newsVar.getNews()
      .then((res) => {
        if (res === false) {
          resolve(false);
        } else {
          console.log(res);
          const rand = Math.floor(Math.random() * res.length - 1);
          const article = res[rand];
          document.getElementById("news-box").removeAll();
          newsElements(article.title, article.image, article.url).appendTo("#news-box");
          document.getElementById("jumbo-box").classList.remove("invisible");
          resolve(res);
        }
      });
  });
}

// Event elements
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

async function showEvents(city, state, eType) {
  const eventSearch = new Events(city, state, eType);
  const events = eventSearch.events();
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

// Form submission
document.querySelector('form').addEventListener("submit", (event) => {
  event.preventDefault();
  const subButton = document.getElementById("submit-btn");
  subButton.setAttribute("disabled", "");
  // get input values
  let city = document.getElementById("city").value;
  let state = document.getElementById("state").value;
  let eType = document.getElementById("eType").value;
  // show tempature and news
  showTemp(city, state)
    .then((good) => {
      if (!good) {
        fetchError("tempature");
      }
    });
  showNews(eType)
    .then((good) => {
      if (!good) {
        fetchError("news");
      }
    });
  // show event cards
  showEvents(city, state, eType)
    .then((good) => {
      if (!good) {
        fetchError("event");
      }
    });
  setTimeout(() => {
    subButton.removeAttribute("disabled");
  }, 5000);
});