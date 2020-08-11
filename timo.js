let interval;
let isCounting;
let startTime = 0;
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
        startTime = prevTime;
        setStopwatch(startTime);
        startStop();

    } else if (prevState && prevState === 'false'){
        timer = parseInt(sessionStorage.getItem('timer'));
        startTime = getTime() - timer;
        setStopwatch(startTime);
        checkbox.checked = false;
        isCounting = false;
    }
    
}

const setStopwatch = function(){

    timer = getTime() - startTime;

    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer / 60) - hours * 60);
    let seconds = Math.floor(timer - minutes * 60 - hours * 3600);

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
    document.getElementById("hours").innerHTML = displayHours;
    document.getElementById("minutes").innerHTML = displayMinutes;
    document.getElementById("seconds").innerHTML = displaySeconds;
}

const getTime = function(){
    let time = new Date().getTime();
    return Math.floor(time / 1000); 
}

const setStorage = function(){
    sessionStorage.setItem('startTime', startTime);
    sessionStorage.setItem('isCounting', isCounting);
    sessionStorage.setItem('timer', timer);
}

const clearStorage = function(){
    sessionStorage.clear(); 
}

function startStop(){
    if(!isCounting){
        startTime = getTime() - timer;
        interval = setInterval(setStopwatch, 1000);
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
    clearStorage();
}

initTimer();