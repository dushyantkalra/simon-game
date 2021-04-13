//Variables
const playButtons = document.querySelectorAll('.buttons button');
const sounds = document.querySelectorAll('audio');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const title = document.querySelector('.turns h1');
let count = 2;
let arrComputer = [];
let arrPlayer = [];
let randomNum = 0;
let num = 0;
//Event Listeners
window.addEventListener('load',function(){
    //Stop Button
    stopButton.addEventListener('click',stopEverything);
    //Start Button
    startButton.addEventListener('click',computerTurn);
    //Play sounds on click
    playButtons.forEach((btn,index)=>{
        btn.addEventListener('click',()=>{
            sounds[index].currentTime = 0;
            sounds[index].play();
            arrPlayer.push(index);
            if(arrPlayer.length == arrComputer.length){
                let ramp =false;
                arrComputer.forEach((turn,index)=>{
                   if( arrPlayer[index] == turn){
                       ramp = true;
                   }
                   else{
                   ramp = false;}
                })
                if(ramp){
                    title.textContent = "Get Ready For the Next Round";
                    arrComputer = [];
                    startButton.textContent = "NEXT";
                    count++;
                }
                else{
                    title.textContent = `Try again Next Time.\n Your Score : ${count-2}`;
                    arrComputer = [];
                    startButton.textContent = "START";
                    count = 2;
                }
            }
        });
    });
    //For Computer Turn
    function computerTurn(){
        arrComputer = [];
        title.textContent = "Match this Pattern on your Turn";
        if(count <= 10){
        let hi = setInterval(()=>{
            randomNum = Math.floor(Math.random()*4);
        if(randomNum > 3){
            randomNum = 3;
        }
        playButtons[randomNum].classList.add(`btn-${randomNum}`);
        arrComputer.push(randomNum);
        let duration = sounds[randomNum].duration * 1000;
        sounds[randomNum].currentTime = 0;
        sounds[randomNum].play();
        num++;
        setTimeout(()=>{
            playButtons[randomNum].classList.remove(`btn-${randomNum}`);
        },800)
        console.log(num);
        if(num >= count){
            clearInterval(hi);
            num = 0;
            arrPlayer = [];
        }
        
        },900)}
        else{
            title.textContent = "You've Won!";
            startButton.textContent = "START";
                    count = 2;
                    
        }

    }
    function stopEverything(){
        title.textContent = `This game is over.
        Your Score : ${count-2}`;
            startButton.textContent = "START";
                    count = 2;
    }

    
});