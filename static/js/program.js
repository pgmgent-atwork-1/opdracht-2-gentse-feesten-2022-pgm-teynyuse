(() => {
const app = {
    initialize() {
    this.cacheElements();
    this.fetchData();
    },
    cacheElements() {
    this.$list = document.getElementById("list");
    this.$title = document.getElementById("category-title");
    },
    async fetchCategories() {
    let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/categories.json",
    );
    return await response.json();
    },
    async fetchEvents() {
    let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events.json"
      );
      return await response.json();
    },
    async fetchData() {
      try {
        const categories = await this.fetchCategories();
        const events = await this.fetchEvents();

        this.generateHTMLForEvents(categories, events);
      } catch (error) {
      }
        try {
        const categories = await this.fetchCategories();

        this.generateHTMLForCate(categories);
      } catch (error) {
      }
    },
    generateHTMLForEvents(categories, events) {
      const day = "15";

      const html = categories
        .map((category) => {
          const filteredEvents = events.filter((event) => {
            return event.day === day && event.category.includes(category);
          });

          return `
          <div class="arrow-title">
            <h2 id="${category}">${category}</h2>
            <a href="#category-title"><svg id="arrow-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.81 32"><path d="M17.81,9.9L8.93,0,0,9.9l2.22,2.01L7.41,6.15v25.85h3V6.14l5.17,5.76,2.23-2Z"/></svg></a>
            </div>
            <ul>
              ${filteredEvents
                .map((obj) => {
                  return `
                <li class ="search-container">
            <div class="image-search">
            <p class= "date-search">${obj.day_of_week} ${obj.day}</p>
            <p class= "date-hour">${obj.day_of_week} ${obj.day} &nbsp;${obj.start}u.</p>
            <img class="image-search-none" src="${obj.image ? obj.image.thumb : "./static/img/images/notfound.png"}" alt="">
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
                  `;
                })
                .join("")}
            </ul>
          `;
        })
        .join("");
      this.$list.innerHTML = html;
    },

    generateHTMLForCate(categories){
            const html = categories
        .map((category) => {
            return `
            <li><a href="#${category}">${category}</a></li>`
        })
        .join("");
      this.$title.innerHTML = html;
    },
  };
  app.initialize();
})();