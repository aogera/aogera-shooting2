function setCanvas(a,b){
	canvas_width=a;
	canvas_height=b;
}
// function make_starttitle(quarter_width,quarter_height,alpha){
function make_starttitle(){
		fill(255,255,0,alpha);
	  rect(quarter_width*0.8,quarter_height*0.8,quarter_width*2.4,quarter_height*0.8);
	  fill(0,0,255,alpha);
	  rect(quarter_width*0.8,quarter_height*2.4,quarter_width*2.4,quarter_height*0.8);
}
function makeGameoverScreen(){
		fill(255,0,0,alpha);
	  circle(circles[over_circle_idx],circles[over_circle_idx+1],radius*2);
	  fill(255);
	  strokeWeight(5);
	  stroke(255,1,0);
	  textSize(52);
	  text("GAMEOVER",canvas_width/5-21,canvas_height/2);
	  strokeWeight(0);
	  textSize(20);
	  fill(0);
	  textAlign(CENTER);
	  text("push R",canvas_width/2,canvas_height/4*3);
	  stroke(0);
	  strokeWeight(1);
}
function readySpace(){
    fill(0);
    textSize(80);
  textAlign(CENTER);
  textSize(20);
  strokeWeight(0);
  text("push Space",canvas_width/2,canvas_height/4*3);
  strokeWeight(1);
}

function makeScores(){
  textAlign(LEFT);

  strokeWeight(0);
  fill(0);
  textSize(40);
  text(score,10,40);
  fill(255,0,0);
  textSize(30);
  text(str[life],canvas_width-100,40);
  strokeWeight(1);
}
function color_line(){
  for(let i=0;i<4;i++){
    if(keyIsDown(raw[i])){
      fill(0,255,0,alpha);
      rect(i*quarter_width,0,quarter_width,canvas_height);
    }
  }
  for(let i=0;i<4;i++){
    if(keyIsDown(col[i])){
      fill(255,255,0,alpha);
      rect(0,i*quarter_height,canvas_width,quarter_height);
    }
  }
}
function makePrepare(){
    fill(0);
    textSize(80);
      fill(255);
      cntdown_timer--;
      circle(canvas_width/2,canvas_height/2,100);
      if(cntdown_timer>=120){
        fill(0);
        textAlign(CENTER,CENTER);
        text("3",canvas_width/2,canvas_height/2);
      }
      else if(cntdown_timer>=60){
        fill(0);
        textAlign(CENTER,CENTER);
        text("2",canvas_width/2,canvas_height/2);
      }
      else{
        fill(0);
        textAlign(CENTER,CENTER);
        text("1",canvas_width/2,canvas_height/2);
      }
      if(cntdown_timer==0){
        init();
        game_state="playing";
      }

}
