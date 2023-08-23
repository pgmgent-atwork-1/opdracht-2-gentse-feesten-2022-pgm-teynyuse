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
            this.$homeEvents = document.querySelector('#home-events');
            this.$news = document.querySelector('#news');
            this.$newsGrid = document.querySelector('#news-grid');
        },
        fetchEventsForIndex() {
            fetch(events_URL)
                .then((response) => response.json())
                .then((homeEvents) => {
                    if(this.$homeEvents) {
                        this.$homeEvents.innerHTML = this.renderHTMLForEvents(homeEvents);
                    }
                })
                .catch((error) => console.log(error));
        },
        fetchNews() {
            fetch(news_URL)
                .then((response) => response.json())
                .then((news) => {
                    if (this.$newsGrid) {
                        this.$newsGrid.innerHTML = this.renderHTMLForNewsHomePage(news);
                    }
                    if (this.$news) {
                        this.$news.innerHTML = this.renderHTMLForNews(news);
                    }
                })
                .catch((error) => console.log(error));
        },

        renderHTMLForEvents(events) {
            const random = Math.floor(Math.random()*(events.length-8));
            return events.slice(random,random+8).map((obj) => {
                return `
                    <a href="/events/detail.html?slug=${obj.slug}&day=${obj.day}" class="event-card">
                                <li class ="event-box list--type">
                            <div class="image-search">
                            <p class= "date-search">${obj.day_of_week} ${obj.day}</p>
                            <p class= "date-hour">${obj.day_of_week} ${obj.day} &nbsp;${obj.start}u.</p>
                            <img class="image-search-none" src="${obj.image ? obj.image.thumb : "../static/img/no-photo.jpg"}" alt="">
                            </div>
                            <div class = "jump_card"></div>
                                <div class="card-front-search">
                                    <h3 class="title-result">${obj.title}</h3>
                                    <div class ="place-hour-search">
                                    <h3 class = "place-search">${obj.location}</h3>
                                    <h3 class = "hour-search">${obj.start} u.</h3>
                                    </div>  
                            </div>
                            </li>
                    </a>`
            }).join('')
        },
        renderHTMLForNewsHomePage(news) {
            return news.slice(0,3).map((news) => {
                return `
                <div class="news-title-grid">
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