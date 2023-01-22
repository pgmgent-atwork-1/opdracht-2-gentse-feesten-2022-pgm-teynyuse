(() =>{

const NEWS_HOME = 'https://www.pgm.gent/data/gentsefeesten/events.json';
fetch(NEWS_HOME).then(Response => {
        return Response.json()
    }).then(data =>{
        console.log(data)
        const eight = document.querySelector(".eight");
        const random = Math.floor(Math.random() * (data.length-8));
        const html = data
        .slice(random, random +8)
        .map((events) => {
            return `
            <div class ="event-container">
            <div class="image-date">
            <p class= "date-event">${events.day_of_week} ${events.day}</p>
            <img class="image-eight-events" src="${events.image ? events.image.thumb : "./static/img/images/notfound.png"}" alt="">
            </div>
            <div class = "jump_card"></div>
                <div class="card-front">
                    <h2 class="title-eight">${events.title}</h2>
                    <div class ="place-hour">
                    <h3 class = "place-eight">${events.location}</h3>
                    <h3 class = "hour-eight">${events.start} u.</h3>
                    </div>
            </div>
            </div>
                `
        }).join('');
    eight.innerHTML = html;
    });




const NEWS_TREE = 'https://www.pgm.gent/data/gentsefeesten/news.json';


    fetch(NEWS_TREE).then(Response => {
        return Response.json()
    }).then(data => {
        console.log(data)
        document.querySelector('.three-news').
            innerHTML = data.slice(0,3).map(function(titleNews){
                return `
                    <li class = "teaser"><p>${titleNews.title}</p></li>`
        }).join('')
    });

})();
