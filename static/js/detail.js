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
                        console.log(events_URL)
        },

        renderHTMLForDetail(events) {
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("slug");
            const day  = params.get('day');
            const filteredEvent = events.find((event) => {
                return event.slug === slug && event.day === day;
            });
                return `

                    <a class="bread_crumb arrow-detail" href="day.html?day=${filteredEvent.day}" title="Programma overzicht">
                    <svg id="arrow-go" class="arrow-events" viewBox="-50 0 1050 270" aria-hidden="true">
                        <path
                            d="M-0.160,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,130.216l-140.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z"
                    fill="#fff"></path></svg>
                    Overzicht vrijdag ${filteredEvent.day} juli
                    </a>
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
                                <div class="detail_col1 column_detail">
                                    <p>Organizator:</p>  
                                    <p>Website:</p>  
                                    <p>Categorieën:</p>       
                                </div>
                                <div class="detail_col2 column_detail">
                                    <p>${filteredEvent.organizer}</p>
                                    <p><a href="${filteredEvent.url}">${filteredEvent.url}</a></p>
                                    <p>${filteredEvent.category}</p>
                                </div>
                            </div>
                            <div class="detail-img">
                                ${this.pictureEvent(filteredEvent)}
                            <div class="socials">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <title>twitter</title>
                            <path d="M12.973 24c7.17 0 11.093-5.77 11.093-10.773 0-0.164-0.003-0.328-0.013-0.49 0.765-0.54 1.411-1.19 1.93-1.935l0.017-0.025c-0.653 0.288-1.41 0.498-2.202 0.591l-0.038 0.004c0.801-0.468 1.407-1.197 1.706-2.068l0.008-0.027c-0.714 0.419-1.544 0.739-2.427 0.912l-0.050 0.008c-1.473-1.526-3.942-1.603-5.512-0.172-0.755 0.684-1.228 1.668-1.232 2.761v0.001c0 0.29 0.035 0.58 0.103 0.863-3.134-0.153-6.055-1.59-8.036-3.956-1.032 1.73-0.504 3.942 1.208 5.054-0.65-0.019-1.255-0.192-1.787-0.483l0.021 0.010v0.048c0 1.802 1.307 3.355 3.125 3.712-0.308 0.085-0.662 0.133-1.027 0.133-0.259 0-0.513-0.025-0.758-0.071l0.025 0.004c0.512 1.541 1.975 2.598 3.642 2.63-1.321 1.011-2.996 1.62-4.814 1.62-0.009 0-0.018 0-0.027-0h0.001c-0.31 0-0.62-0.017-0.929-0.053 1.69 1.068 3.747 1.702 5.953 1.702 0.007 0 0.014 0 0.022-0h-0.001"></path>
                            </svg>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <title>facebook</title>
                            <path d="M17.49 25v-8.21h2.95l0.44-3.2h-3.39v-2.043c0-0.927 0.276-1.558 1.697-1.558l1.813-0.001v-2.862c-0.766-0.080-1.655-0.126-2.555-0.126-0.030 0-0.061 0-0.091 0h0.005c-2.614 0-4.403 1.491-4.403 4.23v2.36h-2.956v3.2h2.956v8.21h3.535z"></path>
                            </svg>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <title>pinterest</title>
                            <path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path>
                            </svg>
                            </div>
                            </div>
                        </div>
                        <div id="location" class="group group--map">

<div class="underbar">
    <div class="col-red">
        <div class="place-event"><p>${filteredEvent.location}</p></div>
        <div class="link-place"><a href="https://maps.google.com/?daddr=${filteredEvent.location},%20Gent">Open in Google Maps</a></div>
        <div class="down-pdf">
        <a href="../../../sites/default/files/feestplan.pdf">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
<title>map</title>
<path d="M10 23.766v-17.526l-4 2v17.528l4-2zM11.086 1.224c0.265-0.141 0.58-0.224 0.914-0.224s0.649 0.083 0.925 0.229l-0.011-0.005 7.086 3.542 7.106-3.552c0.26-0.133 0.568-0.211 0.894-0.211 1.104 0 1.998 0.894 2 1.997v22c0 0 0 0.001 0 0.001 0 0.779-0.445 1.453-1.095 1.784l-0.011 0.005-7.98 3.99c-0.265 0.141-0.58 0.224-0.914 0.224s-0.649-0.083-0.925-0.229l0.011 0.005-7.086-3.542-7.106 3.554c-0.26 0.133-0.568 0.211-0.894 0.211-1.105 0-2-0.895-2-2 0-0.001 0-0.002 0-0.003v0-22c0-0.778 0.445-1.453 1.095-1.783l0.011-0.005 7.98-3.988zM14 6.238v17.528l4 2v-17.526l-4-2zM22 8.238v17.528l4-2v-17.526l-4 2z"></path>
</svg> Download feestplan</a></div>
    </div>
    <div class="gmap">
        <iframe width="100%" height="430px" frameborder="0" scrolling="no" style="border:0;" src="https://maps.google.com/maps?hl=nl&amp;q=${filteredEvent.location},+Gent&amp;t=m&amp;z=16&amp;output=embed&amp;key=AIzaSyBVQnGK8TdmqhcVPZA1h32GCFKltzd-hTA"></iframe>
    </div>
</div>
                        `;
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
    };
    app.init();
})();