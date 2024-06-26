
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

if(button){
    button.addEventListener('click' ,()=> {
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
}

// Index.html
const askbtn = document.getElementById("ask");

if(askbtn){
    askbtn.addEventListener('click',()=>{
        const qstxt = document.getElementById("question");
        const llmresponse = document.getElementById("diagnosis");
        //console.log("waiting..");
        fetch(`/prompt?prompt=${qstxt.value}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    console.log("Unable to fetch");
                }else{
                    //console.log(data);
                    llmresponse.innerHTML=data.response;
                }
            })
        })
    });
}

rh=document.getElementById("humidityv");
if(rh){
    rhv=parseInt(rh.innerHTML);
//console.log(rhv);

temp=document.getElementById("tempv");
tempv=parseInt(temp.innerHTML);
//console.log(tempv);

AridityIndex = 1/(1+(rhv/100)*(1.818*(tempv+15)));
//console.log(AridityIndex);

rainfall = (250 - AridityIndex)/10;
//console.log(rainfall);

const llmresponse = document.getElementById("diagnosis");
if(rainfall>2.5)llmresponse.innerHTML="Expected Rainfall: "+rainfall+"mm\nNo irrigation required as sufficient rain is expected";
else llmresponse.innerHTML="Expected Rainfall: "+rainfall+"mm\nIrrigation required as not enough rain is expected";
}

