const categories_URL = "https://www.pgm.gent/data/gentsefeesten/categories.json";

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.fetchData();
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
            this.$toggleList = document.querySelector("#btn-list");
            this.$toggleRaster = document.querySelector("#btn-grid");
        },

        toggleRaster() {
            this.$toggleRaster.addEventListener("click", (e) => {
                this.$event.classList.remove("items--list");
                this.$event.classList.add("active");

                this.$toggleList.classList.remove("active");
                this.$toggleRaster.classList.add("");
            })
        },

        toggleList() {
            this.$toggleList.addEventListener("click", (e) => {
                this.$event.classList.remove("items--list");
                this.$event.classList.add("items--list");

                this.$toggleRaster.classList.remove("active");
                this.$toggleList.classList.add("active");
            })
        },

        async fetchCategory() {
            let response = await fetch(categories_URL);
            return await response.json();
        },
        async fetchLocation() {
            let response = await fetch(events_URL);
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
                const locations = await this.fetchLocation();

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
                        <a href="#${category}">
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
                            <svg id="arrow-up" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 17.81 32">
                                <path d="M17.81,9.9L8.93,0,0,9.9l2.22,2.01L7.41,6.15v25.85h3V6.14l5.17,5.76,2.23-2Z"/>
                            </svg>
                            </a>
                        </div>
                            <ul class="row-event">
                            ${filteredEvents
                                .map((obj) => {
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
                        </a>
                                `;
                                })
                                .join("")}
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