
const navSlide=()=>{
    const burger = document.querySelector('.burger');
    const nav= document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index)=> {
            if(link.style.animation){
                link.style.animation='';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 +0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
navSlide();

const rawImage = document.getElementById('image-raw');
const mappedImage = document.getElementById('image-processed');
const button = document.getElementById('Reload');

button.onclick = function() {
let raw;
let mapped;
fetch('/images').then((response) => {
    response.json().then((data) => {
        if(data.error){
            rawImage.src = ""
            mappedImage.src = ""
        }else{
            raw = data.rawURL
            mapped = data.mappedURL
            console.log(data.rawURL)
            console.log(data.mappedURL)
        }
    })
})
rawImage.src = raw;
mappedImage.src = mapped;
}