const player = document.querySelector("#player");
const playRange = document.querySelector("#range1");
const total = document.querySelector("#total");
const song = document.querySelector("#song");
const author = document.querySelector("#author");
const current = document.querySelector("#current");
const volume = document.querySelector("#volume");
const volrange = document.querySelector("#volrange");
const speaker = document.querySelector("#loud");
const sec = document.querySelector("#sec");
const min = document.querySelector("#min");
const hrs = document.querySelector("#hrs")
const playMode = document.querySelector("#playmode")
const modes = [{mode:"repeatall",src:""},{mode: "repeat",src:""},{mode:"shuffle",src:""}];
let selectedMode = modes[0].mode;
let setPlayMode;
let mode = 0;
let clicked = false;
let paused = false;
let target = 0;
let currenttime = 1;
let timer = 00;
let timer2 = 00;
let timer3 = 00;
let interval1;


const songs = [
    {
        author:"Boyz II Men",
        song: "It's So Hard To Say Goodbye To Yesterday",
        src:"songs/song1.mp3",
        len: 3.38
    },
    {
        author:"Bryan Adams",
        song: "Heaven",
        src:"songs/song2.mp3",
        len: 4.11
    },
    {
        author:"Elton John",
        song: "Can You Feel The Love Tonight",
        src:"songs/song3.mp3",
        len:4.06
    },
    {
        author:"Lukas Graham",
        song: "7 years",
        src:"songs/song4.mp3",
        len: 3.59
    },
    {
        author:"Miley Cyrus",
        song: "Adore You",
        src:"songs/song5.mp3",
        len: 4.36
    }
];


//smaller functions
let setAuthorAndSong = () =>{
    song.innerHTML = `<p><strong>Playing now:</strong> ${songs[target].song}</p>`;
    author.innerHTML = `<p><strong>Author:</strong> ${songs[target].author}</p>`;
}

volrange.onchange = () =>{
    player.volume = volrange.value/100;
    speaker.innerText = volrange.value;
}
volrange.onmouseout = () => volbar.style.display ="none";
volume.onclick =()=> volbar.style.display ="flex";


playRange.onchange = () => player.currentTime = playRange.value;
let getDuration = () =>{
    setTimeout(()=>{
        let duration = songs[target].len;
        total.innerText = duration;
        range1.max =  player.duration;
    },100)
}
let stopTimer = () => clearInterval(interval1);

let updateTimer = () =>{
    interval1 = setInterval(()=>{
    if(timer == 59){
        timer = 00;
        timer2 ++;
    }else{
        timer ++;
    }
    if(timer2 == 59){
        timer2 = 00;
        timer3 ++
        let timerString3 = timer3.toString().padStart(2,"0")
        hrs.innerText = timerString3;
    }
    let timeString = timer.toString().padStart(2,"0");
    sec.innerText = timeString;
    let timeString2 = timer2.toString().padStart(2,"0");
    min.innerText = timeString2;
    
},1000)
}

playMode.onclick = () =>{
    if (mode == modes.length-1){
        mode = 0;
    }else{
        mode++
    }
    selectedMode = modes[mode].mode;
    console.log(selectedMode)
    setMode();
}
let checkMode = () => {

};
let nextLoop = ()=>{
    player.onended = () =>{
        nextSong();
    }
}
let sameLoop = () => {
    player.onended = () =>{
        player.play();
    }
}
let randomLoop = () => {
    player.onended=()=>{
        loop()
    }
}
let loop = () =>{
    let toss = Math.round(Math.random()*(songs.length-1))
    player.src = songs[toss].src;
    clicked? player.play(): console.log("ewwe");
}


let setMode = () =>{
    switch(mode){
        case 0: (()=>{setPlayMode = nextLoop()})(); break;
        case 1: (()=>{setPlayMode = sameLoop()})(); break;
        case 2: (()=>{setPlayMode = randomLoop()})(); break;
        default: console.log('none of the above')
    }
};
setMode();

//Composite functions

function playSong(){
    setInterval(()=>{
        range1.value = player.currentTime;
        currenttime = player.currentTime;
    },1000)
    player.src = songs[target].src;
    getDuration();
    if(!clicked){
        clicked = true;
        if(paused){
        player.currentTime = currenttime;
        player.play()
        updateTimer();
        paused = false;
    }else{
        updateTimer();
        player.play();
        setAuthorAndSong();
    }
}else{
        clicked = false;
        player.pause();
        stopTimer();
        paused = true;
        player.currentTime = currenttime;
    }
}

function prevSong(){
    timer = -1;
        if(target <= 0){
            target = songs.length-1;
        }else{
            target--; 
        }
        if(selectedMode == "shuffle"){
            loop();
        }else{
            player.src = songs[target].src;
            setAuthorAndSong();
        }
        player.play();
        getDuration();
        clicked = true;
}

function nextSong(){
    timer = -1;
        if(target >= songs.length-1){
            target = 0;
        }else{
            target++;
        }
    if(selectedMode == "shuffle"){
        loop();
    }else{
        player.src = songs[target].src;
        setAuthorAndSong();
    }
    player.play();
    getDuration();
    clicked = true;
}