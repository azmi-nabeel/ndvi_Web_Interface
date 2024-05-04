
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

const rawImage = document.getElementById('rawImage');
const mappedImage = document.getElementById('mappedImage');
const button = document.getElementById('Reload');

button.addEventListener('click' ,function() {
    let raw;
    let mapped;
    fetch('/images').then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log("dsadas");
            }else{
                rawImage.src = data.rawURL;
                mappedImage.src = data.mappedURL;
                console.log(data.rawURL)
                console.log(data.mappedURL)
            }
        })
    });
});

// Index.html
const askbtn = document.getElementById("ask");

askbtn.addEventListener('click',()=>{
    const qstxt = document.getElementById("question");
    const response = document.getElementById("diagnosis");
    fetch(`/prompt?prompt=${qstxt.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log("Unable to fetch");
            }else{
                console.log(data);
            }
        })
    })
});