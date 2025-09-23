let cnt_frame = 0;
let circles = [];
let freq_cir = 60;
let radius = 30;
let speed = 1;
let s = 0;
let alpha = 100;
let raw = [74,75,76,186];
let col = [65,83,68,70];
let is_gameover = 0;
let score = 0;
let life = 3;
let str = ['♡♡♡','♥♡♡','♥♥♡','♥♥♥'];
let now_key_condition = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  cnt_frame++;
  background(220);
  fill(0);
  textSize(40);
  text(score*10,10,40);
  fill(255,0,0,alpha);
  textSize(20);
  text(str[life],300,40);

  if(is_gameover){
    fill(255);
    textSize(32);
    text("GAMEOVER",100,200);
    return;

  }
  if(cnt_frame%freq_cir==0){
    let t = floor(random(0,4));
    circles.push(t*100+50);
    circles.push(10);
  }



  for(let i = s;i < circles.length;i += 2){
    if(circles[i+1]>430){
       s += 2;
       continue;
     }
     if(circles[i]==-1&&circles[i+1]==-1){
      continue;
     }
    fill('white');
    circle(circles[i],circles[i+1],radius);
    // circles[i+1]+=circles[i+1]/100;

    circles[i+1] += speed+i/10;
    if(i%12==10){
      circles[i]+=speed;
    }
    if(circles[i+1]+5>430){
      is_gameover = 1;
    }
    if(circles[i]+5>430){
      is_gameover = 1;
    }
  }


  for(let i=0;i<4;i++){
    if(keyIsDown(raw[i])){
      fill(0,255,0,alpha);
      rect(i*100,0,100,400);
    }
  }
  for(let i=0;i<4;i++){
    if(keyIsDown(col[i])){
      fill(255,255,0,alpha);
      rect(0,100*i,400,100);
    }
  }


  for(let i=0;i<4;i++) for(let j=0;j<4;j++){
    if(now_key_condition==0&&keyIsPressed&&keyIsDown(raw[i])&&keyIsDown(col[j])&&key==' '){
      now_key_condition=1;
      fill(255,0,0,alpha);
      rect(i*100,j*100,100,100);
      let is_erased = 0;
  
      for(let k = s;k<circles.length;k+=2){
        if(i*100<=circles[k]&&circles[k]<=i*100+100){
          if(j*100<=circles[k+1]&&circles[k+1]<=j*100+100){
            // print(k);
            circles[k] = -1;
            circles[k+1] = -1;
            if(score==0)score+=1;
            else score += 3;
            is_erased = 1;
            // circles[k+1] = 500;
          }
        }
      }
      if(!is_erased){
        life--;
        if(life==0) is_gameover=1;
      }
    }
  }

}

function keyReleased(){
  if(key==' ') now_key_condition=0;
}