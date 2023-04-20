var runImageNumber = 1;
var player = document.getElementById("player");
var runWorkerId = 0;
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 340;
var backgroundX = 0;
var background = document.getElementById("background");
var backgroundWorkerId = 0;
var start = 0;
var scoreValue = 0;
var scoreText = document.getElementById("scoreText");
var scoreWorkerId = 0;
var blockId = 1 ;
var blockMarginLeft = 300;
var blockWorkerId = 0;
var moveBlockWorkerId = 0;
var deadImageNumber = 1;
var deadWorkerId = 0;
var scoreWrap = document.getElementById("scoreWrap");
var scoreTextValue = document.getElementById("scoreTextValue");
var beginBoardWrap = document.getElementById("beginBoardWrap");
var idleImageNumber = 1;
var idleWorkerId = 0;

var characterSelect = 1;
var playerBoardWrap = document.getElementById("playerBoardWrap");

var runSound = new Audio("run.mp3");
runSound.loop = true;
var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");


function keyCheck(event){

    if(event.which==13){ 
        if(runWorkerId==0){
            playerBoardWrap.style.visibility = "hidden";
            beginBoardWrap.style.visibility = "hidden";
            runWorkerId = setInterval(run,90);
            backgroundWorkerId = setInterval(moveBackground,95);
            scoreWorkerId = setInterval(updateScore,350);
            start = 1;
            runSound.play();
            blockWorkerId = setInterval(createBlock,1000);
            moveBlockWorkerId = setInterval(moveBlock,120);
            clearInterval(idleWorkerId);
        }   
    }
    if(event.which==32){
        if(start==1){
            if(jumpWorkerId==0){
                clearInterval(runWorkerId);
                runSound.pause();
                runWorkerId = -1;
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();
            }
        }
    }
}


function beginIdle(){
    if(idleWorkerId==0){
        idleWorkerId = setInterval(idle,160);
    }
}

function idle(){
    idleImageNumber++;

    if(idleImageNumber== 11){
        idleImageNumber = 1;
    }

    if(characterSelect==1){
        player.src = "img/character/Idle ("+idleImageNumber+").png";
    }
    if(characterSelect==2){
        player.src = "img/adventureGirl/Idle ("+idleImageNumber+").png";
    }
}

function run(){

    

    if(characterSelect==1){
        runImageNumber++;
        if(runImageNumber==11){
            runImageNumber = 1;
        }
        player.src = "img/character/Run_ ("+runImageNumber+").png";
    }
    if(characterSelect==2){
        runImageNumber++;
        if(runImageNumber==9){
            runImageNumber = 1;
        }
        player.src = "img/adventureGirl/Run ("+runImageNumber+").png";
    }
}

function jump(){

    jumpImageNumber++;
    if(jumpImageNumber<=6){
        playerMarginTop -= 20;
    }
    if(jumpImageNumber>=7){
        playerMarginTop += 20;
    }
    if(jumpImageNumber==11){
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,90);
        runSound.play();
        jumpWorkerId = 0;
    }

    player.style.marginTop = playerMarginTop+"px";
    if(characterSelect==1){
        player.src = "img/character/Jump ("+jumpImageNumber+").png";
    }
    if(characterSelect==2){
        player.src = "img/adventureGirl/Jump ("+jumpImageNumber+").png";
    }
}

function moveBackground(){

    backgroundX -= 15;
    background.style.backgroundPositionX = backgroundX+"px";

}

function updateScore(){

    scoreValue += 10;
    scoreText.innerHTML = scoreValue;
}

function createBlock(){

    var block = document.createElement("div");
    block.id = "block" + blockId;
    blockId++;
    block.className = "block";
    var gap = Math.random() * (600-200) + 300;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft+"px";
    background.appendChild(block);
}

function moveBlock(){
    for(var i=1; i<=blockId; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        
        if(characterSelect==1){
            var startTouch = 160;
            var endTouch = 65;
        }
        if(characterSelect==2){
            var startTouch = 220;
            var endTouch = 100;
        }


        if(newMarginLeft<startTouch){
            if(newMarginLeft>endTouch){
                if(playerMarginTop>=334){

                    clearInterval(scoreWorkerId);
                    clearInterval(backgroundWorkerId);
                    clearInterval(blockWorkerId);
                    clearInterval(moveBlockWorkerId);
                    clearInterval(runWorkerId);
                    runSound.pause();
                    clearInterval(jumpWorkerId);
                    jumpWorkerId = -1;
                    deadWorkerId = setInterval(dead,200);
                    scoreWrap.style.visibility = "visible";
                    scoreTextValue.innerHTML = "Your Score: " + scoreValue; 
                    
                }
            }
        }
    }
}

function dead(){

    deadImageNumber++;

    if(deadImageNumber==10){
        clearInterval(deadWorkerId);
        // player.style.marginTop = "343px";
    }
    deadSound.play();
    if(characterSelect==1){
        player.src = "img/character/Dead ("+deadImageNumber+").png";
    }
    if(characterSelect==2){
        player.src = "img/adventureGirl/Dead ("+deadImageNumber+").png";
    }
}

function restart(){
    location.reload();
}

function startRun(){
    setInterval(run, 150);
}

function closeWindow() {
    window.close();
}

function runPage() {
    window.location.href = 'play.html';
}

function homePage() {
    window.location.href = 'index.html';
}

function playerSelect2() {
    characterSelect = 2;
    beginIdle();
    playerBoardWrap.style.visibility = "hidden";
    beginBoardWrap.style.visibility = "visible";
    player.style.visibility = "visible";
}

function playerSelect1() {
    characterSelect = 1;
    beginIdle();
    playerBoardWrap.style.visibility = "hidden";
    beginBoardWrap.style.visibility = "visible";
    player.style.visibility = "visible";
}

function playerHide(){
    player.style.visibility = "hidden";
}