const urlNasaAPOD = 'https://api.nasa.gov/planetary/apod?api_key='; //Sem a Key
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

    json.forEach((item, index) => { //for each p cada item e índice

        if (index - 1 >= cards.length) return;  // não deixa que o número de itens ultrapasse o de cards

        const card = cards[index]; // numero de cards
        const pTitle = card.querySelector("#title"); // pega o parágrafo 
        const paragraph = card.querySelector("article"); // pega o parágrafo 
        const image = card.querySelector("#image"); // pega a imagem
        const video = card.querySelector("#video")

        pTitle.innerHTML =  item.title; 
        paragraph.textContent =  item.explanation;
        
        if(item.url.endsWith(".jpg") || item.url.endsWith(".gif")) {
            image.style.display = "block"; 
            image.src = item.url;
            image.alt = item.title;
            video.style.display = 'none';

        }
        else {
            video.style.display = 'block';
            video.src = item.url;
            image.style.display = 'none';
        }

    });

        console.log(json);
    } catch (error) {
        console.error("Erro ao buscar dados: " + error.message);
    }
}

document.querySelectorAll('.image').forEach(img => {
    img.onclick = function() {
        let imagem = document.querySelector("#imageUpscaled");
        let video = document.querySelector("#videoUpscaled");
        
        if (this.src.endsWith(".jpg") || this.src.endsWith(".gif") || this.src.endsWith(".html")) {
            imagem.src = this.src;
            imagem.style.display = "block";
            video.style.display = "none";
        }
        else if (this.src.includes("youtube") || this.src.includes("vimeo")) {
            video.src = this.src;
            video.style.display = "block";
            imagem.style.display = "none";
            console.log(video.src);
        }
        
        document.querySelector(".imageUpscaled").style.display = "block";
        
        console.log(this.src);
        console.log(currentHour);
    }
})

document.querySelector(".imageUpscaled").onclick = function() {
    document.querySelector(".imageUpscaled").style.display = "none";
}

window.addEventListener('resize', function() {
    let canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
    }
});

document.addEventListener("DOMContentLoaded", getData);
document.addEventListener("DOMContentLoaded", backgroundChanging(currentHour));