export default class Exchange {
  static getCurrency(currency, newCurrency, usd) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency}/${newCurrency}/${usd}`, {mode:'cors'})
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function(error) {
        return error;
      });
  }
}