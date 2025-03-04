const urlNasaAPOD = `https://api.nasa.gov/planetary/apod?api_key=NULL&count=6`;
const urlNasaFireball = 'https://ssd-api.jpl.nasa.gov/fireball.api?limit=1'

const cards = document.querySelectorAll(".card");
const img = document.getElementById("img");
const imgToUpscale = document.getElementById("imageUpscaled");

let isActive = false;
let item;
let index = 7;

async function getData() {
  
    try {
        const response = await fetch(urlNasaAPOD);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    json.forEach((item, index) => { 

        if (index - 1 >= cards.length) return;  

        document.body.style.backgroundImage.src = item.url

        const card = cards[index];
        const pTitle = card.querySelector("#title"); 
        const paragraph = card.querySelector("article"); 
        const image = card.querySelector("img"); 

        pTitle.innerHTML =  item.title; 
        paragraph.textContent =  item.explanation;
        
        image.src = item.url;
        image.alt = item.title;
        image.style.display = "block"; 

    });

        console.log(json);
    } catch (error) {
        console.error("Erro ao buscar dados: " + error.message);
    }
}

document.querySelectorAll('.image').forEach(img => {
    img.onclick = function() {
        let imagem = document.querySelector("#imageUpscaled");



        imagem.src = this.src;
        document.querySelector(".imageUpscaled").style.display = "block";
    }
})

document.querySelector(".imageUpscaled").onclick = function() {
    document.querySelector(".imageUpscaled").style.display = "none";
}

document.addEventListener("DOMContentLoaded", getData);