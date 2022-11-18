export default class Events {
  constructor(city, state, segment) {
    this.city = city;
    this.state = state;
    this.segment = segment;
    this.radius = 25;
    this.unit = "miles";
  }

  async events() {
    const url = `https://v6.exchangerate-api.com/v6/f3fc82d54a4d03f53256c65f/pair/USD/GBP`;
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