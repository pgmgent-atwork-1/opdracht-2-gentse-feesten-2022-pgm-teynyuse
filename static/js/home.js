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
        document.querySelector('.news-eight').
            innerHTML = data.slice(0,8).map(function(titleNews){
                return `
                <h1>${titleNews.title}</h1>`
        }).join('')
    });

    



const NEWS_TREE = 'https://www.pgm.gent/data/gentsefeesten/news.json';


    fetch(NEWS_TREE).then(Response => {
        return Response.json()
    }).then(data => {
        console.log(data)
        document.querySelector('.troi-news').
            innerHTML = data.slice(0,3).map(function(titleNews){
                return `
                <h1>${titleNews.title}</h1>`
        }).join('')
    });

})();
