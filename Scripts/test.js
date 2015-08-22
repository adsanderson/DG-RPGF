/**
 * @author Adam
 *
 */

var healthP1 = 100;
var healthP2 = 100;
var AttackStrength;
var arAttValueP1=new Array();
var arAttString=new Array();
var arAttValueP2 = new Array();
var momentumValueP1 = 50;
var momentumValueP2 = 50;
var momentumValuePercP1;
var momentumValuePercP2;
var momentumResult;
var turnTime = 3000;

$(document).ready(function(){
    /**/
    $("#btnWeak").click(function(){
        clickScore(5);
    });

    $("#btnMid").click(function(){
        clickScore(15);
    });

    $("#btnStrong").click(function(){
        clickScore(25);
    });
});

/*Timer for moving the Queue*/
var timer = $.timer(function() {

    var arAttValueP1Turn = updateQueue(arAttValueP1, "divQueueP1");
    var arAttValueP2Turn = updateQueue(arAttValueP2, "divQueueP2");

    momentumValuePercP1 = momentumValueP1/arAttValueP1Turn
    momentumValuePercP2 = momentumValueP2/arAttValueP2Turn

    momentumResult = ((momentumValuePercP1/(momentumValuePercP1+momentumValuePercP2))*0.7)+0.15;

    if (momentumResult<Math.random()) {
        healthP1 = Math.floor(healthP1 - arAttValueP1Turn + ((100 - healthP1)/5));
        $("#divHealthP2>span").text(healthP1);
        $(".meterP2").attr('value', healthP1);
        $("#divScoreHit>span").text("Player 1 wins this round");
        momentumValueP1 = momentumValueP1 + (arAttValueP2Turn/2);
        momentumValueP2 = momentumValueP2 - (arAttValueP1Turn/2);
    } else{
        healthP2 = Math.floor(healthP2 - arAttValueP2Turn + ((100 - healthP2)/5));
        $("#divHealthP1>span").text(healthP2);
        $(".meterP1").attr('value', healthP2);
        $("#divScoreHit>span").text("Player 2 wins this round");
        momentumValueP1 = momentumValueP1 - (arAttValueP2Turn/2);
        momentumValueP2 = momentumValueP2 + (arAttValueP1Turn/2);
    };
    $("#meterMomentum").attr('value', momentumValueP1);
    if (healthP1 <= 0 || healthP2 <= 0 ){
        timer.stop()
        $("#divScoreHit").text("Game Over!");
        for(i=0; i<=5; i++){
        $(".divQueueP1:nth-child(" + (i+1) + ")").text("");
    }
    }
    cpuPlayer();
    $("#countdown").animate({width:0},turnTime);
    $("#countdown").animate({width:'100%'},0);
});

    timer.set({ time : turnTime, autostart : true });
/*////////////////////////////////////////*/
/* - function for randomized data, value to be
 * randomised and the percentage it should be
 * randomized by * */
/*////////////////////////////////////////*/
function randomizer(valueToRandom, randomPlusMinus){
    var randomnumber=Math.random()*randomPlusMinus;
    return valueToRandom = Math.round(valueToRandom * (randomnumber+(1-(randomPlusMinus/2))));
}
/*////////////////////////////////////////*/
/* - function for the cpuPlayer decisions */
/*////////////////////////////////////////*/
function clickScore(attValue){
    var arAttValueRnd = randomizer(attValue, 0.5);
    var longHitProbability = ((arAttValueRnd*arAttValueRnd)/20)+(healthP1/6);
    if (arAttValueP1.length <= 5){
        if (Math.random()*100 < longHitProbability){
            arAttValueP1.push(0);
            $(".divQueueP1:nth-child(" + (arAttValueP1.length) + ")").text(0);
        }
        else{
            arAttValueP1.push(arAttValueRnd);
            $(".divQueueP1:nth-child(" + (arAttValueP1.length) + ")").text(arAttValueRnd);
        }
    }
}



/*////////////////////////////////////////*/
/* - function for the cpuPlayer decisions */
/*////////////////////////////////////////*/
function cpuPlayer(){
    var rndAttacks=Math.floor(Math.random()*4)

    for (var i=0; i <= rndAttacks ; i++) {

      if (healthP1 >= 76) {
        AttValueP2 = randomizer(5, 0.5);
        var longHitProbability = ((AttValueP2*AttValueP2)/20)+(healthP1/6);
        if (Math.random()*100 < longHitProbability){
            AttValueP2 = 0
        }
      }
      else if (healthP1 < 76 && healthP1 > 50) {
        AttValueP2 = randomizer(15, 0.5);
        var longHitProbability = ((AttValueP2*AttValueP2)/20)+(healthP1/6);
        if (Math.random()*100 < longHitProbability){
            AttValueP2 = 0
        }
      } else{
        AttValueP2 = randomizer(25, 0.5);
        var longHitProbability = ((AttValueP2*AttValueP2)/20)+(healthP1/6);
        if (Math.random()*100 < longHitProbability){
            AttValueP2 = 0
        }

      };

      arAttValueP2.push(AttValueP2);
      $(".divQueueP2:nth-child(" + (arAttValueP2.length) + ")").text(AttValueP2);
    };
}
/*///////////////////////////////////////////////////////*/
/* - function to get the First value in the Attack Queue */
/*   and update the queues at the bottom of the screen - */
/*///////////////////////////////////////////////////////*/
function updateQueue(arAttValue, divQueueID){
    if(arAttValue.length > 0){
        arAttValueTurn = arAttValue.shift();
    }
    else{
        arAttValueTurn = 0
    }
    for(i=0; i<=5; i++){
        $("."+divQueueID+":nth-child(" + (i+1) + ")").text(arAttValue[i]);
    }
    for(i=arAttValue.length; i<=5; i++){
        $("."+divQueueID+":nth-child(" + (i+1) + ")").text("");
    }
    return arAttValueTurn;
}
