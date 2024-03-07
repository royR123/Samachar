const apiKey="";
const url = "https://newsapi.org/v2/everything?q="
window.addEventListener('load' , () =>{
    fetchNews("Technology")
})
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
const bindData = (articles) => {
    const cardsContainer = document.getElementById("cards-container-id");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone , article);
        cardsContainer.appendChild(cardClone);
    });
    
}

const fillDataInCard = (cardClone , article) => {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleDateString("en-US" , {
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url , "_blank");
    })
}
let navItem = null;

const navItemSearch = (id) => {
    fetchNews(id);
    const tmp = document.getElementById(id);
    navItem?.classList.remove('active');
    navItem = tmp;
    navItem.classList.add('active');
}
const searchTopic = () => { 
    const topicElement = document.getElementById("search-topic"); 
    if(topicElement.value){
        fetchNews(topicElement.value);
        topicElement.value = ""
        navItem?.classList.remove('active');
    }

}
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click' , () => {
    searchTopic();

}) 