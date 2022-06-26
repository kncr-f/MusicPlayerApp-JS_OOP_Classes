const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
// const audio = document.querySelector("#audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");

const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    //console.log(music.getName())
    displayMusic(music);

});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file

}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
    togglePlay();

});

prev.addEventListener("click", () => {
    prevMusic();
});

next.addEventListener("click", () => {
    nextMusic();
});

function prevMusic() {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic()
}

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


function pauseMusic() {
    audio.pause();
    play.classList = "fa-solid fa-play"
};

function playMusic() {
    audio.play();
    play.classList = "fa-solid fa-pause"
};

function togglePlay() {
    if (container.classList.contains("playing")) {
        container.classList.remove("playing")
    } else {
        container.classList.add("playing")
    }
}


