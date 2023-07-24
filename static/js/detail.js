(() => {
    const app = {
        init() {
            this.cacheElements();
            this.fetchEvents();
        },

        cacheElements() {
            this.$btnDay = document.querySelector("#btn-day");
            this.$detail = document.querySelector("#detail");
        },

        fetchEvents() {
            fetch(events_URL)
            .then((response) => response.json())
            .then((events) => {
                this.$detail.innerHTML = this.renderHTMLForDetail(events);
            })
            .catch((error) => console.log(error));
        },

        renderHTMLForDetail(events) {
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("slug");
            const day  = params.get('day');
            const filteredEvent = events.find((event) => {
                return event.slug === slug && event.day === day;
            });
                return `
                        <div class="event-detail">
                            <div class="event-detail-info">
                                <div class="detail-location">
                                    <h1>${filteredEvent.title}</h1>
                                    <div class="location-time">
                                        <p>${filteredEvent.location}</p>
                                        <p>${filteredEvent.start}u. - ${filteredEvent.end}u.</p>
                                    </div>
                                </div>
                                ${this.description(filteredEvent)}
                            </div>
                            <div class="detail-info">
                                <div class="organizer">
                                    <p>Organisator:</p>
                                    <p>${filteredEvent.organizer}</p>
                                </div>
                                ${this.website(filteredEvent)}
                                <div class="category">
                                    <p>Categorieën:</p>         
                                    <p>${filteredEvent.category}</p>
                                </div>
                            </div>
                            <div class="detail-img">
                                ${this.pictureEvent(filteredEvent)}
                            </div>
                        </div>`;
        },

        description(event) {
            if (event.description) {
                return `<p class="event-description">${event.description}</p>`
            } else {
                return ``
            }
        },

        pictureEvent(events) {
            if (events.image === null) {
                return `<img src="../static/img/no-photo.jpg">`;
            } else {
                return `<img src="${events.image.full}" alt="${events.title}">`;
            }
        },

        website(event) {
            if(event.url === null) {
                return ``
            } else {
                return `
                    <div class="website">
                        <p>Website:</p>
                        <a href="${event.url}">${event.url}</a>
                    </div>`
            }
        }
    };
    app.init();
})();