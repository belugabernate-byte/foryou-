const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");

const envelope = document.querySelector(".envelope");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const nextBtn = document.getElementById("nextBtn");
const typing = document.getElementById("typing");
const music = document.getElementById("bgMusic");


// Playful nudges for the "not now" link
const messages = [
    "not now",
    "are you sure? 🥺",
    "just a peek? 💕",
    "it's waiting for you 😭",
    "one tap, i promise ❤️",
    "don't leave it sealed 💔",
    "okay, last try 🥹"
];

let count = 0;

// "not now" drifts away instead of a hard reject
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

// Wax seal — cracks open, then reveals the flower page
yesBtn.addEventListener("click", () => {

    music.volume = 0;
    music.play().catch((err) => {
        console.warn("Music couldn't autoplay:", err);
    });

    let volume = 0;
    const fade = setInterval(() => {
        if (volume < 1) {
            volume += 0.05;
            music.volume = Math.min(volume, 1);
        } else {
            clearInterval(fade);
        }
    }, 150);

    envelope.classList.add("opening");

    setTimeout(() => {
        page1.classList.remove("active");
        page2.classList.add("active");
    }, 480);

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
let typingTimeout = null;

function startTyping(){

    typing.innerHTML = "";
    index = 0;

    if (typingTimeout) clearTimeout(typingTimeout);

    function type(){
        if(index < letter.length){
            typing.innerHTML += letter.charAt(index);
            index++;
            typingTimeout = setTimeout(type, 35);
        }
    }

    type();

}

// Ambient falling petals
const petalGlyphs = ["💐", "🌷", "🌹", "💖"];

function createPetal(){

    const petal = document.createElement("div");

    petal.classList.add("petal");
    petal.innerHTML = petalGlyphs[Math.floor(Math.random() * petalGlyphs.length)];
    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.fontSize = (14 + Math.random() * 18) + "px";
    petal.style.animationDuration = (7 + Math.random() * 6) + "s";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 13000);

}

setInterval(createPetal, 600);

// Gallery popup
const galleryBtn = document.getElementById("galleryBtn");
const galleryPopup = document.getElementById("galleryPopup");
const closeGallery = document.getElementById("closeGallery");

galleryBtn.onclick = () => {
    galleryPopup.style.display = "block";
};

closeGallery.onclick = () => {
    galleryPopup.style.display = "none";
};

// If a photo file is missing, show a tidy placeholder instead of a broken-image icon
document.querySelectorAll(".polaroid img").forEach((img) => {
    img.addEventListener("error", () => {
        img.closest(".polaroid").classList.add("polaroid--empty");
    });
});

// Bouquet reveal
const bouquetBtn = document.getElementById("bouquetBtn");

bouquetBtn.onclick = () => {
    page3.classList.remove("active");
    page4.classList.add("active");
};

// Back navigation
function goBack(from, to){
    from.classList.remove("active");
    to.classList.add("active");
}

document.getElementById("backBtn2").onclick = () => {
    envelope.classList.remove("opening"); // reset the seal so it's clickable again
    goBack(page2, page1);
};
document.getElementById("backBtn3").onclick = () => goBack(page3, page2);
document.getElementById("backBtn4").onclick = () => goBack(page4, page3);
