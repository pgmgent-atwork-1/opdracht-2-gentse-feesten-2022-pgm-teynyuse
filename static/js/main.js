const events_URL = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const news_URL = 'https://www.pgm.gent/data/gentsefeesten/news.json';

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.fetchEventsForIndex();
            this.fetchNews();
        },

        cacheElements() {
            this.$events = document.querySelector('#events');
            this.$news = document.querySelector('#news');
            this.$newsIndex = document.querySelector('#news-index');
        },
        fetchEventsForIndex() {
            fetch(events_URL)
                .then((response) => response.json())
                .then((events) => {
                    if(this.$events) {
                        this.$events.innerHTML = this.renderHTMLForEvents(events);
                    }
                })
                .catch((error) => console.log(error));
        },
        fetchNews() {
            fetch(news_URL)
                .then((response) => response.json())
                .then((news) => {
                    if (this.$newsIndex) {
                        this.$newsIndex.innerHTML = this.renderHTMLForNewsHomePage(news);
                    }
                    if (this.$news) {
                        this.$news.innerHTML = this.renderHTMLForNews(news);
                    }
                })
                .catch((error) => console.log(error));
        },

        renderHTMLForEvents(events) {
            const random = Math.floor(Math.random()*(events.length-8));
            return events.slice(random,random+8).map((event) => {
                return `
                    <a href="events/detail.html?slug=${event.slug}&day=${event.day}" class="event-card">
                        <div class="div-event">
                            <div class="event-date">
                                <p>${event.day_of_week} ${event.day} JULI</p>
                                <div class="event-img">
                                    ${this.pictureEvent(event)}
                                </div>
                            </div>
                            <div class="event-info">
                                <p class="event-title">${event.title}</p>
                                <div class="event-location">
                                    <span>${event.location}</span>
                                    <p>${event.start} u.</p>
                                </div>
                            </div>
                        </div>
                    </a>`
            }).join('')
        },
        renderHTMLForNewsHomePage(news) {
            return news.slice(0,3).map((news) => {
                return `
                <div class="news-title-index">
                    <p>${news.title}</p>
                    <div class="arrow-right">
                        <div class="stick">
                            <div class="arrowhead"></div>
                        </div>
                    </div>
                </div>`
            }).join('');
        },

        pictureEvent(events) {
            if (events.image === null) {
                return `<img src="static/img/no-photo.jpg">`
            } else {
                return `<img src="${events.image.full}" alt="${events.title}">`
            }
        },
    }
    app.init();
})();