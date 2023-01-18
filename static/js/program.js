(() => {
const app = {
    initialize() {
    this.cacheElements();
    this.fetchData();
    },
    cacheElements() {
    this.$list = document.getElementById("list");
    this.$category = document.getElementById("category");
    },
    async fetchCategories() {
    let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/categories.json",
    );
    return await response.json();
    },
    async fetchEvents() {
    let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
      );
      return await response.json();
    },
    async fetchData() {
      try {
        const categories = await this.fetchCategories();
        const events = await this.fetchEvents();

        this.generateHTMLForEvents(categories, events);
      } catch (error) {
        // todo
      }
    },
    generateHTMLForEvents(categories, events) {
      const day = "20";

      const html = categories
        .map((category) => {
          const filteredEvents = events.filter((event) => {
            return event.day === day && event.category.includes(category);
          });

          return `
            <h2 id="${category}">${category}</h2>
            <ul>
              ${filteredEvents
                .map((event) => {
                  return `
                    <li>${event.title}</li>
                    <li><img src="${event.image ? event.image.thumb : "./static/img/images/notfound.png"}" alt=""></li>
                  `;
                })
                .join("")}
            </ul>
          `;
        })
        .join("");

      this.$list.innerHTML = html;
    },

    generateHTMLForCategories(categories, events) {
      const html = categories
        .map((category) => {
          return `
            <h2>${category.category}</h2>
          `;
        })
        .join("");

      this.$category.innerHTML = html;
    },
  };



  app.initialize();
})();