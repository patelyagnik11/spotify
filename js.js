console.log("Welcome to JavaScript");
let songIndex = 0;
let audioElement = new Audio('./assets/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let song = [
    { songname: "Let Me Love You", filepath: "assets/1.mp3", coverpath: "assets/1.jpg" },
    { songname: "Such Kehraha Hai", filepath: "assets/2.mp3", coverpath: "assets/2.jpg" },
    { songname: "Tum Tak", filepath: "assets/3.mp3", coverpath: "assets/3.jpg" },
    { songname: "Bulleya", filepath: "assets/4.mp3", coverpath: "assets/4.jpg" },
    { songname: "Slow Motion Angreza", filepath: "assets/5.mp3", coverpath: "assets/5.jpg" },
    { songname: "Senorita", filepath: "assets/6.mp3", coverpath: "assets/6.jpg" },
    { songname: "Maston Ka Jund", filepath: "assets/7.mp3", coverpath: "assets/7.jpg" },
    { songname: "Main Paravana", filepath: "assets/8.mp3", coverpath: "assets/8.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = song[i].songname;
});

masterPlay.addEventListener('click', togglePlay);

function togglePlay() {
    if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
}

audioElement.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
}

myProgressBar.addEventListener('input', () => {
    let seekTime = (myProgressBar.value * audioElement.duration) / 100;
    audioElement.currentTime = seekTime;
});

function makeAllPlays() {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = song[songIndex].filepath;
        masterSongName.innerText = song[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % song.length;
    audioElement.src = song[songIndex].filepath;
    masterSongName.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + song.length) % song.length;
    audioElement.src = song[songIndex].filepath;
    masterSongName.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});


document.getElementById('next').addEventListener('click', () => {
    // Pause the currently playing song
    audioElement.pause();
    
    // Update the play icon for the currently playing song item
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.remove('fa-circle-pause');
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.add('fa-circle-play');

    // Move to the next song
    songIndex = (songIndex + 1) % song.length;

    // Update the audio source and song name
    audioElement.src = song[songIndex].filepath;
    masterSongName.innerText = song[songIndex].songname;

    // Play the next song
    audioElement.play();

    // Update the play icon for the next song item
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.remove('fa-circle-play');
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.add('fa-circle-pause');

    // Update the master play button icon
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    // Pause the currently playing song
    audioElement.pause();
    
    // Update the play icon for the currently playing song item
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.remove('fa-circle-pause');
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.add('fa-circle-play');

    // Move to the previous song
    songIndex = (songIndex - 1 + song.length) % song.length;

    // Update the audio source and song name
    audioElement.src = song[songIndex].filepath;
    masterSongName.innerText = song[songIndex].songname;

    // Play the previous song
    audioElement.play();

    // Update the play icon for the previous song item
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.remove('fa-circle-play');
    songItems[songIndex].getElementsByClassName("songitemplay")[0].classList.add('fa-circle-pause');

    // Update the master play button icon
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
