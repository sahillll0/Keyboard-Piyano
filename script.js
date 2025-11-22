const container = document.querySelector(".piano-container-inside");
const presstext = document.getElementById("press-text")
const cursor = document.getElementById("cursor")
// 25 keys from A to Y
const keys = "ABCDEFGHIJKLMNOPQRSTUVWXY".split("");

window.addEventListener("mousemove", (e)=>{
    cursor.style.display = "block";
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
})

keys.forEach((key, index) => {
    // Map keys to audio files starting from 28.mp3
    const audioIndex = 28 + index;
    const audioSrc = `Audio/${audioIndex}.mp3`;

    const keyDiv = document.createElement("div");
    keyDiv.classList.add("piano-key");
    keyDiv.setAttribute("data-key", key);

    keyDiv.innerHTML = `
    <div class="piano-top"></div>
    <div class="piano-btm">${key}</div>
    <audio src="${audioSrc}" data-audio="${key}"></audio>
    `;

    // Mouse click event
    keyDiv.addEventListener("click", () => {
        playSound(key);
        presstext.textContent = `${key}`
        
    });

    container.appendChild(keyDiv);
});

// Keyboard press event
window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (keys.includes(key)) {
        playSound(key);
        presstext.textContent = `${key}`

    }
});

function playSound(key) {
    const audio = document.querySelector(`audio[data-audio="${key}"]`);
    const keyDiv = document.querySelector(`.piano-key[data-key="${key}"]`);

    if (!audio) return;

    audio.currentTime = 0; // Rewind to the start
    audio.play();

    // Visual feedback
    keyDiv.classList.add("click-btn");
    setTimeout(() => {
        keyDiv.classList.remove("click-btn");
    }, 200);
}