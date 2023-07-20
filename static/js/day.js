const categories_URL = "https://www.pgm.gent/data/gentsefeesten/categories.json";

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.fetchData();
            this.openAsideDay();
            this.closeAsideDay();
            this.toggleList();
            this.toggleRaster();
        },

        cacheElements() {
            this.$btnDay = document.querySelector('#change-day');
            this.$asideDay = document.querySelector('#aside-day');
            this.$crossDay = document.querySelector('#cross-day');
            this.$event = document.querySelector("#event");
            this.$detail = document.querySelector("#detail");
            this.$filterCategory = document.querySelector("#filter-items");
            this.$toggleList = document.querySelector("#toggle-list");
            this.$toggleRaster = document.querySelector("#toggle-raster");
        },

        openAsideDay() {
            this.$btnDay.addEventListener("click", (e) => {
                this.$asideDay.classList.add("open");
            });
        },

        closeAsideDay() {
            this.$crossDay.addEventListener("click", (e) => {
                this.$asideDay.classList.remove("open");
            });
        },

        toggleRaster() {
            this.$toggleRaster.addEventListener("click", (e) => {
                this.$event.classList.remove("event-list");
                this.$event.classList.add("raster-event");

                this.$toggleList.classList.remove("active");
                this.$toggleRaster.classList.add("active");
            })
        },

        toggleList() {
            this.$toggleList.addEventListener("click", (e) => {
                this.$event.classList.remove("raster-event");
                this.$event.classList.add("event-list");

                this.$toggleRaster.classList.remove("active");
                this.$toggleList.classList.add("active");
            })
        },

        async fetchCategory() {
            let response = await fetch(categories_URL);
            return await response.json();
        },

        async fetchEvents() {
            let response = await fetch(events_URL);
            return await response.json();
        },

        async fetchData() {
            try {
                let categories = await this.fetchCategory();
                const events = await this.fetchEvents();

                if (this.$event) {
                this.$event.innerHTML = this.renderHTMLForCategory(categories,events);
                }

                this.$filterCategory.innerHTML = this.renderHTMLForFilterCategory(categories);
            } catch (error) {
                console.log(error);
            }
        },

        renderHTMLForFilterCategory(categories) {
            return categories
                .map((category) => {
                return `
                        <li>
                        <a href="#${category}">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <title>category</title>
                                <path d="M10.741 32c-2.648 0-5.137-1.031-7.009-2.902s-2.903-4.361-2.903-7.009 1.031-5.137 2.903-7.009l13.006-13.006c1.338-1.337 3.115-2.074 5.006-2.074s3.668 0.737 5.006 2.073c1.337 1.337 2.073 3.115 2.073 5.007s-0.737 3.67-2.073 5.007l-13.022 13.006c-1.591 1.592-4.413 1.594-6.005 0.001-0.791-0.792-1.245-1.887-1.245-3.005 0-1.135 0.442-2.202 1.244-3.003l12.016-12.002c0.553-0.551 1.45-0.553 2.003 0.001 0.551 0.553 0.551 1.449-0.001 2.001l-12.017 12.002c-0.267 0.267-0.414 0.622-0.414 1.001 0 0.373 0.151 0.738 0.415 1.002 0.53 0.529 1.472 0.531 2.004 0l13.021-13.007c0.802-0.801 1.244-1.868 1.244-3.004s-0.442-2.203-1.244-3.004c-1.606-1.606-4.403-1.606-6.009 0l-13.006 13.006c-1.337 1.338-2.074 3.115-2.074 5.007s0.737 3.669 2.074 5.007c1.337 1.337 3.115 2.073 5.007 2.073s3.67-0.737 5.007-2.073l13.006-13.006c0.553-0.553 1.448-0.553 2.001 0s0.553 1.448 0 2.001l-13.006 13.006c-1.872 1.871-4.361 2.902-7.009 2.902z"></path>
                            </svg>
                            <p>${category}</p>
                        </a>
                    </li>`;
            }).join("\n");
        },

        renderHTMLForCategory(categories, events) {
            const params = new URLSearchParams(window.location.search);
            const day = params.get("day") ?? "15";
            return categories
                .map((category) => {
                let filteredEvents = events.filter((event) => {
                    return event.day === day && event.category.includes(category);
                });
                console.log(filteredEvents);
                return `
                    <div>
                        <div class="category">
                            <h2 id="${category}">${category}</h2>
                            <a href="#filter-items">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 18 32">
                                    <title>arrow-up</title>
                                    <path d="M17.809 9.9l-8.88-9.9-8.929 9.897 2.225 2.007 5.189-5.752-0 25.848h2.997l0-25.863 5.169 5.763z"></path>
                                </svg>
                            </a>
                        </div>
                        <ul>
                            ${filteredEvents
                                .map((event) => {
                                return `
                                    <li>
                                        <a href="detail.html?slug=${event.slug}&day=${event.day}" class="event-card">
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
                return `<img src="../static/img/no-photo.jpg">`;
            } else {
                return `<img src="${events.image.full}" alt="${events.title}">`;
            }
        },
    };
    app.init();
})();