export default class Search {
  constructor(city, state, segment) {
    this.city = city;
    this.state = state;
    this.segment = segment;

  }

  async events() {
    return new Promise((resolve) => {
      const radius = 25;
      const unit = "miles";
      const key = process.env.api_key;
      const req = new XMLHttpRequest();
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&radius=${radius}&unit=${unit}&city=${this.city}&segmentName=${this.segment}&sort=date,asc&stateCode=${this.state}`;
      req.addEventListener("loadend", () => {
        if (req.status === 200) {
          const data = JSON.parse(req.responseText);
          if (data.page.totalElements > 0) {
            resolve(data._embedded.events);
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      });
      req.open("GET", url, true);
      req.send();
    });
  }
}