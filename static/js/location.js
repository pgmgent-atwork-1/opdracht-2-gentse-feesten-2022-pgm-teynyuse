const locations_URL = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';


(() => {
    const app = {
        init() {
            this.cacheElements();
            this.fetchLocationsForEvents();
            this.fetchEventsForLocations();
        },

        cacheElements() {
            this.$locations = document.querySelector('#locations');
            this.$locationsEvent = document.querySelector('#eventLocations');
        },
        fetchLocationsForEvents() {
            fetch(locations_URL)
                .then((response) => response.json())
                .then((locations) => {
                    if(this.$locations) {
                        this.$locations.innerHTML = this.renderHTMLForLocations(locations);
                        console.log(locations)
                    }
                })
                .catch((error) => console.log(error));
        },
        fetchEventsForLocations() {
            fetch(locations_URL)
                .then((response) => response.json())
                .then((locationsEvent) => {
                    if(this.$eventLocations) {
                        this.$eventLocations.innerHTML = this.renderHTMLEventForLocations(locationsEvent);
                        console.log(locationsEvent)
                    }
                })
                .catch((error) => console.log(error));
        },

        renderHTMLForLocations(locations) {
            return locations
                .map((locations) => {
                return `
                        <li class="category_name">
                        <?xml version="1.0" encoding="utf-8"?>
                    <!-- Generator: Adobe Illustrator 26.5.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                    <svg version="1.1" id="Laag_1" fill="white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
                    <path d="M10.7,32c-2.6,0-5.1-1-7-2.9s-2.9-4.4-2.9-7s1-5.1,2.9-7l13-13c1.3-1.3,3.1-2.1,5-2.1s3.7,0.7,5,2.1c1.3,1.3,2.1,3.1,2.1,5
                        s-0.7,3.7-2.1,5l-13,13c-1.6,1.6-4.4,1.6-6,0c-0.8-0.8-1.2-1.9-1.2-3c0-1.1,0.4-2.2,1.2-3l12-12c0.6-0.6,1.5-0.6,2,0
                        c0.6,0.6,0.6,1.4,0,2l-12,12c-0.3,0.3-0.4,0.6-0.4,1c0,0.4,0.2,0.7,0.4,1c0.5,0.5,1.5,0.5,2,0l13-13c0.8-0.8,1.2-1.9,1.2-3
                        s-0.4-2.2-1.2-3c-1.6-1.6-4.4-1.6-6,0l-13,13c-1.3,1.3-2.1,3.1-2.1,5s0.7,3.7,2.1,5c1.3,1.3,3.1,2.1,5,2.1s3.7-0.7,5-2.1l13-13
                        c0.6-0.6,1.4-0.6,2,0s0.6,1.4,0,2l-13,13C15.9,31,13.4,32,10.7,32L10.7,32z"/>
                    </svg>
                        <a href="#${locations.location}">
                            <p>${locations.location}</p>
                        </a>
                    </li>`;
            }).join("\n");
        },
        renderHTMLForLocationsEvents(locations) {
            const params = new URLSearchParams(window.location.search);
            const day = params.get("day") ?? "15";
            return locations
                .map((location) => {
                let filteredLocations = events.filter((event) => {
                    return event.day === day && event.location.includes(location);
                });
                console.log(filteredLocations);
                return `
                    <div>
                        <div class="category">
                            <h2 id="${locations.location}">${locations.location}</h2>
                            <a href="#filter-items">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 18 32">
                                    <title>arrow-up</title>
                                    <path d="M17.809 9.9l-8.88-9.9-8.929 9.897 2.225 2.007 5.189-5.752-0 25.848h2.997l0-25.863 5.169 5.763z"></path>
                                </svg>
                            </a>
                        </div>
                        <ul class="items-category">
                            ${filteredEvents
                                .map((event) => {
                                return `
                                    <li class="items-category">
                                        <a href="detail.html?slug=${event.slug}&day=${event.day}" class="event-card">
                                            <div class="event-box">
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
                                                        <p class="event-start">${event.start} u.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>`;
                            }).join("")}
                        </ul>
                    </div>
                    `;
            })
            .join("");
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