export default class Weather {
  constructor(city, state) {
    this.city = city;
    this.state = state;
  }

  async temp() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},&appid=${process.env.weather_key}&units=imperial`;
    return new Promise((resolve) => {
      fetch(url)
        .then((res) => {
          if (res.ok) {
            res.json()
              .then((jres) => {
                resolve(jres.main.temp);
              });
          } else {
            resolve(null);
          }
        });
    });
  }
}