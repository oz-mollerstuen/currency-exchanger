// IMPORTS

// scripts
import Exchange from "./scripts/exchange";


// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// named module imports

import AlertMagic from "sweetalert2";


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
function getCurrency(currency, newCurrency, usd) {
  Exchange.getCurrency(currency, newCurrency, usd)
    .then(function(response) {
      if(response.conversion_result) {
        printElements(response, currency, newCurrency, usd);
      }  else {
        printError(response, currency,  newCurrency, usd);
      }
    });
}

function printElements (response, currency, newCurrency, usd) {
  let conversionAmount = response.conversion_result;
  document.getElementById("conversion-output").innerText = `Conversion: ${usd} ${currency} is worth ${conversionAmount} ${newCurrency}`;
}

function printError (error) {
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  if (error.toString().includes('404')){
    outputs.innerText = fetchError()
  } else {
    outputs.innerText = fetchError()
  }
}

function handleForm (e) {
  e.preventDefault();
  let outputs = document.getElementById("conversion-output");
  outputs.innerHTML = null;
  let currency = document.getElementById("base-currency").value;
  let newCurrency = document.getElementById("target-currency").value;
  let usd = parseInt(document.querySelector("input#usd-input").value);
  getCurrency(currency, newCurrency, usd);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleForm);
});