let interval;
let isCounting;
let timer = 0;

const checkbox = document.querySelector("#checkbox");
checkbox.addEventListener('change', function(){
    startStop();
    setStorage();
});

const initTimer = function (){
    isCounting = false;
    let prevState = sessionStorage.getItem('isCounting');
    let prevTime = sessionStorage.getItem('startTime');

    if (prevState && prevState === 'true'){
        checkbox.checked = true;
        timer = getTime() - prevTime;
        setStopwatch(timer);
        startStop();
        console.log("asdasd");

    } else if (prevState && prevState === 'false'){
        timer = parseInt(sessionStorage.getItem('timer'));
        setStopwatch(timer);
        checkbox.checked = false;
        isCounting = false;
    }
    
}

const countTime = function(){
    timer++;
    setStopwatch(timer);
}

const setStopwatch = function(timer){

    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

const getTime = function(){
    let time = new Date().getTime();
    return Math.floor(time / 1000); 
}

const setStorage = function(){
    let startTime = getTime() - timer;
    sessionStorage.setItem('startTime', startTime);
    sessionStorage.setItem('isCounting', isCounting);
    sessionStorage.setItem('timer', timer);
}

function startStop(){
    if(!isCounting){
        interval = setInterval(countTime, 1000);
        isCounting = true;
    }
    else{
        clearInterval(interval);
        isCounting = false;
    }
}

function reset(){
    clearInterval(interval);
    isCounting = false;
    checkbox.checked = false;
    timer = 0;
    isCounting = false;
    setStopwatch(timer);
    setStorage();
}

initTimer();