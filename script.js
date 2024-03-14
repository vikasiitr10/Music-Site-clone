console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myScrollBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songName = Array.from(document.getElementsByClassName('songName'));

let songs = [
    {song: "Wanna Be Yours - Arctic Monkey", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {song: "Another Love", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {song: "Summertime Sadness - lana de ray", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {song: "Until I Found You", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {song: "After Dark - ketty", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {song: "Moonlight-kali Uchi", filePath: "songs/2.mp3", coverPath: "covers/6.jpeg"},
    {song: "Counting Stars - One republic", filePath: "songs/2.mp3", coverPath: "covers/7.jpeg"},
    {song: "Space Song - Beach House", filePath: "songs/2.mp3", coverPath: "covers/8.jpeg"},
    {song: "Husn - Anuv Jain", filePath: "songs/2.mp3", coverPath: "covers/9.jpeg"},
    {song: "Somewhere Only We Know", filePath: "songs/4.mp3", coverPath: "covers/10.jpeg"},
]

songName.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("song")[0].innerText = songs[i].song; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myScrollBar.value = progress;
})

myScrollBar.addEventListener('change', ()=>{
    audioElement.currentTime = myScrollBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].song;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].song;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].song;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})