class Music {
    constructor(title, singer, img, file) {
        this.title = title,
            this.singer = singer,
            this.img = img,
            this.file = file
    }
    getName() {
        return this.title + " - " + this.singer;
    }
}
const musicList = [
    new Music("Zombie", "Cranberries", "1.jpeg", "1.mp3"),
    new Music("Comfortably Numb", "Pink Floyd", "2.jpeg", "2.mp3"),
    new Music("Noting Else Matters", "Metallica", "3.jpeg", "3.mp3")
];