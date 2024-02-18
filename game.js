

const buttonColours =["red", "blue", "green", "yellow"]
var gamePattern =[];
var userClickedPattern=[] ;

var level = 0;


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour ).fadeToggle(100).fadeIn();

    playSound(randomChosenColour);

}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");   
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});
var started = false ;

$(document).keypress(function(){
   if(!started){
   
         $("#level-title").text("Level " + level) ;
         nextSequence();
         started=true;
   } 
   
});


function checkAnswer(currentLevel){

   
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");  
        
    if(userClickedPattern.length === gamePattern.length){
        
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}
    else{
        console.log("wrong");  
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}