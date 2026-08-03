const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const nextBtn = document.getElementById("nextBtn");
const typing = document.getElementById("typing");
const music = document.getElementById("bgMusic");


// Funny messages for the No button
const messages = [
    "No 😢",
    "Really? 🥺",
    "Please? 💕",
    "Think again 😭",
    "Pretty please? ❤️",
    "Don't break my heart 💔",
    "Okay... one more chance? 🥹"
];

let count = 0;

// No button moves around
noBtn.addEventListener("mouseover", () => {

    count++;

    if(count < messages.length){
        noBtn.innerText = messages[count];
    }

    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});

// Yes button
yesBtn.addEventListener("click", () => {

    music.volume = 0;
    music.play();

    let volume = 0;

    const fade = setInterval(() => {

        if (volume < 1) {
            volume += 0.05;
            music.volume = volume;
        } else {
            clearInterval(fade);
        }

    }, 150);

    page1.classList.remove("active");
    page2.classList.add("active");

});

// Continue button
nextBtn.addEventListener("click", () => {

    page2.classList.remove("active");
    page3.classList.add("active");

    startTyping();

});

// Letter
const letter = `happy birthday, my love ❤️

today is your special day, and i just want you to know how thankful i am to have someone as amazing as you in my life.

you make my days brighter, my heart happier, and my world so much better just by being you.

i hope all your dreams come true, and i promise i'll keep loving you, supporting you, and making more beautiful memories with you.

thank you for everything.

i love you so much.

happy birthday, baby. ❤️`;

// Typing effect
let index = 0;

function startTyping(){

    typing.innerHTML = "";

    index = 0;

    function type(){

        if(index < letter.length){

            typing.innerHTML += letter.charAt(index);

            index++;

            setTimeout(type, 35);

        }

    }

    type();

}

// Floating hearts
function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "💖";

    heart.style.left = Math.random() * window.innerWidth + "px";

    heart.style.fontSize = (15 + Math.random() * 25) + "px";

    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}

setInterval(createHeart, 400);