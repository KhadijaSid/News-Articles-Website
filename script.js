const API_KEY ="b83b385ed664471fb45dc350b5945ee7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("Pakistan"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);    
}

function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCard = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cloneCard = newsCard.content.cloneNode(true);
        fillDataInCard(cloneCard, article);
        cardsContainer.appendChild(cloneCard);
    });
}

function fillDataInCard(cloneCard, article){
    const newsImage = cloneCard.querySelector("#new-img");
    const newsTitle = cloneCard.querySelector("#news-title");
    const newsSource = cloneCard.querySelector("#news-source");
    const newsDesc = cloneCard.querySelector("#news-desc");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone : "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cloneCard.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank');
    });

}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchBtn.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;

})