// IMPORTS

// scripts
import Events from "./scripts/events";
import Exchange from "./scripts/exchange";
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

async function showTemp(usd, exchanges) {
  return new Promise((resolve) => {
    const tempVar = new Exchange(usd, exchanges);
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


async function showExchange(usd, exchanges, eType) {
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
  let usd = document.getElementById("usd").value;
  let exchanges = document.getElementById("exchanges").value;
  let eType = document.getElementById("eType").value;
  // show tempature and news
  showNews(eType)
    .then((good) => {
      if (!good) {
        fetchError("news");
      }
    });
  // show event cards
  showExchange(usd, exchange, eType)
    .then((good) => {
      if (!good) {
        fetchError("event");
      }
    });
  setTimeout(() => {
    subButton.removeAttribute("disabled");
  }, 5000);
});