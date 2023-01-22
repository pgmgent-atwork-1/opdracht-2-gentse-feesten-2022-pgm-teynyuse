(async()=>{

const filterEvents = async (search) => {
    const data = await fetch("https://www.pgm.gent/data/gentsefeesten/events.json", { method: 'GET', });
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

    /*document.querySelector('.result').
    innerHTML = events.map((result)=>{
        return`<div class="result-info"><strong>${result.length} results</strong></div>`
    }).join('');*/
    document.querySelector('.search-results').
        innerHTML = events.map((obj) => {
                return `
                <li class ="search-container">
            <div class="image-search">
            <p class= "date-search">${obj.day_of_week} ${obj.day}</p>
            <p class= "date-hour">${obj.day_of_week} ${obj.day} &nbsp;${obj.start}u.</p>
            <img class="image-search-none" src="${obj.image ? obj.image.thumb : "./static/img/images/notfound.png"}" alt="">
            </div>
            <div class = "jump_card"></div>
                <div class="card-front-search">
                    <h2 class="title-result">${obj.title}</h2>
                    <div class ="place-hour-search">
                    <h3 class = "place-search">${obj.location}</h3>
                    <h3 class = "hour-search">${obj.start} u.</h3>
                    </div>  
            </div>
            </li>`
            }).join('');

    $list = document.getElementById("list");
    $btnGrid = document.getElementById("btn-grid");
    $btnList = document.getElementById("btn-list");

    $btnGrid.addEventListener("click", () => {
        $list.classList.remove("items--list");
        $btnGrid.classList.add("active");
        $btnList.classList.remove("active");
    });

    $btnList.addEventListener("click", () => {
        $list.classList.add("items--list");
        $btnList.classList.add("active");
        $btnGrid.classList.remove("active");
    });    
})();

