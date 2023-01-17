(async()=>{

const filterEvents = async (search) => {
    const data = await fetch("https://www.pgm.gent/data/gentsefeesten/events_500.json", { method: 'GET', });
    const events = await data.json();
    const filteredEvents = events.filter((event) =>
        event.category.findIndex(e => e.toLowerCase().includes(search)) !== -1 ||
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search)
    ); 
    return filteredEvents;
}

    const params = new URLSearchParams(window.location.search)
    const search = params.get("search");

    const events = await filterEvents(search);

    console.log(events);

    document.querySelector('.events').
        innerHTML = events.map((obj) => {
                return `<h2>${obj.title}</h2>
                        <p>${obj.location}</p>
                        <p>${obj.day_of_week}</p>
                        <p>${obj.start}</p>
                        <img src="${obj.image ? obj.image.thumb : "./static/img/images/notfound.png"}" alt="">`
            }).join('');
    
})();

