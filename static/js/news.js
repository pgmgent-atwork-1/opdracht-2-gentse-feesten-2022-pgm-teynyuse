(() =>{
    let newsCard = document.querySelector(".news-card");

const NEWS_DATA = 'https://www.pgm.gent/data/gentsefeesten/news.json';


    fetch(NEWS_DATA).then(Response => {
        return Response.json()
    }).then(data => {
        console.log(data)
        document.querySelector('.title-news').
            innerHTML = data.map(function(titleNews){
                return `
                <div class="new-card">
                <div class ="title-bg-news">
                <h1>${titleNews.title}</h1>
                </div>
                <img src="https://www.pgm.gent/data/gentsefeesten/${titleNews.picture.medium}" alt="">
                </div>`
        }).join('')
    });
})();

