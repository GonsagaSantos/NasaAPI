//GET https://api.nasa.gov/planetary/apod 
//eNfk3U38RfFbksiqFWzv3LH4vyquxtzGhKwRWWUS
const showMe = document.getElementById("yes");
const paragraph = document.getElementById("paragraph");
const image = document.getElementById("image");
const count = 10;

async function getData() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=eNfk3U38RfFbksiqFWzv3LH4vyquxtzGhKwRWWUS&count=5"
    try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        json.forEach(item => {
            const explanation = item.explanation;
            const title = item.title;
            const imageSrc = item.url;
            paragraph.innerHTML = `<strong>${title}</strong>: ${explanation}<br><br>`;
            document.getElementById("image").src = `${imageSrc}`
        });
        console.log(json);
      } catch (error) {
        console.error(error.message);
    }
}

image.addEventListener("click", () => {
    image.classList.toggle("imageUpscaled")
})