const events_URL = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.search();
        },

        cacheElements() {
            this.$search = document.querySelector("#search");
            this.$sectionSearch = document.querySelector("#section-search");
        },


        async search() {
            const params = new URLSearchParams(window.location.search);
            const search = params.get("search");

            const filterEvents = async (search) => {
                const data = await fetch(events_URL, { method: 'GET', });
                const events = await data.json();
                const filteredEvents = events.filter((event) =>
                    event.category.findIndex(e => e.toLowerCase().includes(search)) !== -1 ||
                    event.title.toLowerCase().includes(search) ||
                    event.location.toLowerCase().includes(search)
                ); 
                return filteredEvents;
            }

            const items = await filterEvents(search);
            const searchItem = items.map((item) => {
                return `
                    <li>
                        <a href="events/detail.html?slug=${item.slug}&day=${item.day}" class="event-card">
                            <div class="div-event">
                                <div class="event-date">
                                    <p>${item.day_of_week} ${item.day} JULI</p>
                                    <div class="event-img">
                                        ${this.pictureEvent(item)}
                                    </div>
                                </div>
                                <div class="event-info">
                                    <p class="event-title">${item.title}</p>
                                    <div class="event-location">
                                        <span>${item.location}</span>
                                        <p>${item.start} u.</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`
            }).join('\n')
            this.$search.innerHTML += searchItem;
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