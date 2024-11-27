const timeText = document.getElementById('timeText');

let isRunning = false;
let elapsedTime = 0;
let timer = null;
let startTime = 0;

function stopTimer()
{
    if(isRunning)
    {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - elapsedTime;
    }
}

function getPrettyTime(hours, minutes, seconds)
{
    let res = ""
    if(hours > 0) res += hours + "h "
    if(minutes > 0) res += minutes + "min "
    res += seconds + "s"
    return res;
}

function resetTimer()
{
    elapsedTime = 0;
    timer = null;
    startTime = 0;
    isRunning = false;
    timeText.textContent = "00:00:00";
}

function startTimer()
{
    if(!isRunning)
    {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function update()
{
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000*60*60))
    let minutes = Math.floor(elapsedTime / (1000*60) % 60)
    let seconds = Math.floor(elapsedTime / (1000) % 60)
    timeText.textContent = getPrettyTime(hours, minutes, seconds);
}


