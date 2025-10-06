class ShakeCanvas{
  constructor(){
    this.magnitude=0;
    this.damping=  0.90;
    this.beforeInit=true;
  }
  init(){
    this.magnitude=30;
  }
  shake(){
    translate(
      random(-this.magnitude,this.magnitude),
      random(-this.magnitude,this.magnitude)
    )
    this.magnitude*=this.damping;
  }
}


function make_starttitle(){
		fill(255,255,0,alpha);
	  rect(quarter_width*0.8,quarter_height*0.8,quarter_width*2.4,quarter_height*0.8);
	  fill(0,0,255,alpha);
	  rect(quarter_width*0.8,quarter_height*2.4,quarter_width*2.4,quarter_height*0.8);
}
function makeGameoverScreen(){
    if(over_circle_idx!=-1){
      fill(255,0,0,alpha);
      circle(meteors[over_circle_idx].x,meteors[over_circle_idx].y,meteors[over_circle_idx].radius*2);
    }
    fill(255);
	  strokeWeight(5);
	  stroke(255,0,0);
	  textSize(52);
    textAlign(CENTER);
	  text("GAMEOVER",canvasWidth/2,canvasHeight/2);
    textAlign(LEFT);
	  strokeWeight(0);
	  textSize(20);
	  fill(0);
	  textAlign(CENTER);
	  text("push R",canvasWidth/2+random(-1,1),canvasHeight/4*3+random(-1,1));
	  stroke(0);
	  strokeWeight(1);
}
function readySpace(){
  fill(0);
  textSize(80);
  textAlign(CENTER);
  textSize(20);
  strokeWeight(0);
  text("push Space",canvasWidth/2,canvasHeight/4*3);
  strokeWeight(1);
}

function makeScores(){
  textAlign(LEFT);

  strokeWeight(5);
  stroke('white');
  fill(0);
  textSize(40);
  text(score,10,40);
  fill(255,0,0);
  textSize(30);
  text(str[life],canvasWidth-100,40);
  strokeWeight(0);
  stroke('black');

  textAlign(CENTER,CENTER);
  fill(0,0,255,alpha/2);
  textSize(200);
  text(combo,canvasWidth/2,canvasHeight/2);
  textAlign(LEFT);
  strokeWeight(1);
}

function color_line(){
  for(let i=0;i<4;i++){
    if(keyIsDown(raw[i])){
      fill(0,255,0,alpha);
      rect(marginWidth+insideWidth*i/4,marginHeight,insideWidth/4,insideHeight);
      // rect(i*quarter_width,0,quarter_width,canvasHeight);
    }
  }
  for(let i=0;i<4;i++){
    if(keyIsDown(col[i])){
      fill(255,255,0,alpha);
      rect(marginWidth,marginHeight+insideHeight*i/4,insideWidth,insideHeight/4);
      // rect(0,i*quarter_height,canvasWidth,quarter_height);
    }
  }
}

function makePrepare(){
    fill(0);
    textSize(80);
      fill(255);
      cntdown_timer--;
      circle(canvasWidth/2,canvasHeight/2,100);
      if(cntdown_timer>=120){
        fill(0);
        textAlign(CENTER,CENTER);
        text("3",canvasWidth/2,canvasHeight/2);
      }
      else if(cntdown_timer>=60){
        fill(0);
        textAlign(CENTER,CENTER);
        text("2",canvasWidth/2,canvasHeight/2);
      }
      else{
        fill(0);
        textAlign(CENTER,CENTER);
        text("1",canvasWidth/2,canvasHeight/2);
      }
      if(cntdown_timer==0){
        init();
        game_state="playing";
      }

}

function makeAllCrear(){
  textAlign(CENTER);
  fill(255);
  strokeWeight(5);
  stroke(255,1,0);
  textSize(52);
  text("AllClear!",canvasWidth/2,canvasHeight/2); 
  stroke(0);
  strokeWeight(1);
  textAlign(LEFT);
}
