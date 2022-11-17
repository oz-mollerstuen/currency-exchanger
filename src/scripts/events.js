export default class Events {
  constructor(city, state, segment) {
    this.city = city;
    this.state = state;
    this.segment = segment;
    this.radius = 25;
    this.unit = "miles";
  }

  async events() {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.event_key}&radius=${this.radius}&unit=${this.unit}&city=${this.city}&segmentName=${this.segment}&sort=date,asc&stateCode=${this.state}`;
    return new Promise((resolve) => {
      fetch(url, {mode: "cors"})
        .then((res) => {
          if (res.ok) {
            res.json()
              .then((jres) => {
                if (jres.page.totalElements > 0) {
                  resolve(jres._embedded.events);
                } else {
                  resolve(0);
                }
              });
          } else {
            resolve(0);
          }
        });
    });
  }
}