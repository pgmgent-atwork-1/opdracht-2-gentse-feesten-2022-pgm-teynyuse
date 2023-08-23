(() => {
    const app = {
        init() {
            this.cacheElements();
            this.setDefaultSearch();
            this.search();
            this.toggleList();
            this.toggleRaster();
        },

        cacheElements() {
            this.$search = document.querySelector("#search");
            this.$sectionSearch = document.querySelector("#section-search");
            this.$toggleList = document.querySelector("#btn-list");
            this.$toggleRaster = document.querySelector("#btn-grid");
        },

        toggleRaster() {
            this.$toggleRaster.addEventListener("click", (e) => {
                this.$sectionSearch.classList.remove("items--list");
                this.$sectionSearch.classList.add("active");

                this.$toggleList.classList.remove("active");
                this.$toggleRaster.classList.add("");
            })
        },

        toggleList() {
            this.$toggleList.addEventListener("click", (e) => {
                this.$sectionSearch.classList.remove("items--list");
                this.$sectionSearch.classList.add("items--list");

                this.$toggleRaster.classList.remove("active");
                this.$toggleList.classList.add("active");
            })
        },

        setDefaultSearch() {
            const params = new URLSearchParams(window.location.search);
            let search = params.get("search");
            if (!search) {
                search = "puppetbusker";
                params.set("search", search);
                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.replaceState({}, '', newUrl);
            }
            this.$search.value = search;
        },

        async search() {
            const params = new URLSearchParams(window.location.search);
            const search = params.get("search").toLowerCase();

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
            const searchItem = items.map((obj) => {
                return `
                                        <a href="/events/detail.html?slug=${obj.slug}&day=${obj.day}" class="event-card">
                                <li class ="event-box list--type">
                            <div class="image-search">
                            <p class= "date-search">${obj.day_of_week} ${obj.day}</p>
                            <p class= "date-hour">${obj.day_of_week} ${obj.day} &nbsp;${obj.start}u.</p>
                            <img class="image-search-none" src="../${obj.image ? obj.image.thumb : "/static/img/no-photo.jpg"}" alt="">
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
            }).join('\n');
            this.$sectionSearch.innerHTML = searchItem;
        },

        pictureEvent(events) {
            if (events.image === null) {
                return `<img src="../static/img/no-photo.jpg">`
            } else {
                return `<img src="${events.image.full}" alt="${events.title}">`
            }
        },
    };
    app.init();
})();


