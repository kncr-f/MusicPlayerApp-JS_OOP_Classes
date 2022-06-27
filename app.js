const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const current = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("#music-list .list-group");
const li = document.querySelector("#music-list .list-group-item");

const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();

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
    playMusic();
    isPlayingNow();

}

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();

}


function pauseMusic() {
    audio.pause();
    play.querySelector("i").classList = "fa-solid fa-play"
};

function playMusic() {
    audio.play();
    play.querySelector("i").classList = "fa-solid fa-pause"
};

function togglePlay() {
    if (container.classList.contains("playing")) {
        container.classList.remove("playing")
    } else {
        container.classList.add("playing")
    }
}

const calculateTime = (seconds) => {

    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    const updatedSecond = second < 10 ? `0${second}` : second;

    return `${minute}:${updatedSecond}`

}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    current.textContent = calculateTime(progressBar.value)

});

progressBar.addEventListener("input", () => {
    current.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value
})


volumeBar.addEventListener("input", (e) => {
    audio.volume = (e.target.value) / 100;
    if (e.target.value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";

    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
})

let muteState = "unmuted";

volume.addEventListener("click", () => {
    if (muteState === "unmuted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
        audio.volume = 1;
    }

});

const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {

        let content = `
        <li onclick="playSelected(this)" li-index='${i}' class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
    `;
        ul.insertAdjacentHTML("beforeend", content);
        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);


        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })

    }
}

const playSelected = (item) => {

    player.index = item.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();

}

const isPlayingNow = () => {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing");
        }
        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing")
        }

    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})