export default class News {
  constructor(eType) {
    this.eType = eType;
  }

  hasNews() {
    if (localStorage.getItem(`${this.eType}-news`)) {
      return [true, JSON.parse(localStorage.getItem(`${this.eType}-news`))];
    } else {
      return [false, null];
    }
  }

  async getNews() {
    return new Promise((resolve) => {
      const newsExists = this.hasNews();
      if (newsExists[0]) {
        resolve(newsExists[1]);
      } else {
        const url = `https://gnews.io/api/v4/search?q=${this.eType}&lang=en&token=${process.env.news_key}`;
        fetch(url)
          .then((res) => {
            if (res.ok) {
              res.json()
                .then((jres) => {
                  localStorage.setItem(`${this.eType}-news`, JSON.stringify(jres.articles));
                  resolve(jres.articles);
                });
            } else {
              resolve(false);
            }
          });
      }
    });
  }
}