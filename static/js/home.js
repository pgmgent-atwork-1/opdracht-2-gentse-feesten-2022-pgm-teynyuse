(() =>{

/*const NEWS_HOME = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
fetch(NEWS_HOME).then(Response => {
        return Response.json()
    }).then(data =>{
        data.slice(0,8).map(function(randomNews){
            return randomNews[Math.floor(Math.random()*randomNews.length)];
        })
    });
    randomNews()
    function getNews() {
        document.querySelector(".title-news").
        innerHTML = data.map((obj) => {
            return `<h1>${obj.title}</h1>`
        })
    }
    getNews();
    
*/

const NEWS_HOME = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
fetch(NEWS_HOME).then(Response => {
        return Response.json()
    }).then(data =>{
        console.log(data)
        const eight = document.getElementById("eight");
        const random = Math.floor(Math.random() * data.length);
        const html = data
        .slice(random, random +8)
        .map((titleNews) => {
            return `
                <h1>${titleNews.title}</h1>
                <img src="${titleNews.image ? titleNews.image.thumb : "./static/img/images/notfound.png"}" alt="">`
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
