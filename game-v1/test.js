/**
 * @author Adam
 *
 */

var health = 100;  
var AttackStrength;
var arAttValue=new Array(); // regular array (add an optional integer
var arAttString=new Array();
var arAttValueCPU = new Array();

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
	
	if(arAttValue.length > 0){
		arAttValueTurn = arAttValue.shift();
	}
	else{
		arAttValueTurn = 0
	}
	for(i=0; i<=5; i++){
		$(".divQueueP1:nth-child(" + (i+1) + ")").text(arAttValue[i]);
	}
	for(i=arAttValue.length; i<=5; i++){
		$(".divQueueP1:nth-child(" + (i+1) + ")").text("");
	}
	var intHealthRegen = (100 - health)/5;
	health = Math.floor(health - arAttValueTurn + intHealthRegen);
	$("#divHealthP2>span").text(health);
	$("#divHealthP2>meter").attr('value', health);
	if (health <= 0){
		timer.stop()
		$("#divScoreHit").text("You Win!");
		for(i=0; i<=5; i++){
		$(".divQueueP1:nth-child(" + (i+1) + ")").text("");
	}
	}
	cpuPlayer();
});
        
	timer.set({ time : 2000, autostart : true });

function randomizer(valueToRandom, randomPlusMinus){
	var randomnumber=Math.random()*randomPlusMinus;
	return valueToRandom = Math.round(valueToRandom * (randomnumber+(1-(randomPlusMinus/2))));
}
function clickScore(attValue){
	var arAttValueRnd = randomizer(attValue, 0.5);
	var longHitProbability = ((arAttValueRnd*arAttValueRnd)/20)+(health/6);
	if (arAttValue.length <= 5){
		if (Math.random()*100 < longHitProbability){
			arAttValue.push(0);
			$(".divQueueP1:nth-child(" + (arAttValue.length) + ")").text(0);
		}
		else{
			arAttValue.push(arAttValueRnd);
			$(".divQueueP1:nth-child(" + (arAttValue.length) + ")").text(arAttValueRnd);
		}
	}
}

function cpuPlayer(){
	var rndAttacks=Math.floor(Math.random()*4)
	
	for (var i=0; i <= rndAttacks ; i++) {
	  arAttValueCPU.push(i);
	  $(".divQueueP2:nth-child(" + (arAttValueCPU.length) + ")").text(i);
	};
}
