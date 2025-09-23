let cnt_frame = 0;
let circles = [];//円iは中心の座標が(circles[4*i],circles[4*i+1])で速度が(circles[4*i+2],circles[4*i+3])
let freq_cir = 60;
let radius = 30;
let speed_x = 0,speed_y = 1;//基本の円の落下速度
let alpha = 100;//行と列を選択したときの不透明度
let raw = [74,75,76,186];//jkl;
let col = [65,83,68,70]; //asdf
let is_gameover = 0;
let score = 0;
let life = 3;
let str = ['♡♡♡','♥♡♡','♥♥♡','♥♥♥'];
let now_key_condition = 0;
let canvas_height=400,canvas_width=400;
let backet = 100;
function setup() {
  createCanvas(canvas_height, canvas_width);
}

function draw() {
  cnt_frame++;
  background(220);
  fill(0);
  textSize(40);
  text(score,10,40);
  fill(255,0,0,alpha);
  textSize(30);
  text(str[life],canvas_width-100,40);

  if(is_gameover){
    fill(255);
    textSize(32);
    text("GAMEOVER",100,200);
    return;

  }
  if(cnt_frame%freq_cir==0){
    let start_x = floor(random(0,canvas_width/backet))*backet+backet/2;//4つのレーンからランダムに
    circles.push(start_x,10);//出現座標

    //10%で斜めのボールがでる
    if(random(0,10)<1){
      if(start_x<canvas_width/2) circles.push(1,speed_y);
      else circles.push(-1,speed_y);
    }
    else{
      circles.push(speed_x,speed_y);
    }
  }

  //y方向に少しずつ加速する
  if(cnt_frame%30==15){
    speed_y+=1/100;
  }



  //ボールの描画、位置の修正
  for(let i = 0;i < circles.length;i += 4){

    if(circles[i]==-1&&circles[i+1]==-1){
      continue;
    }

    //今の座標でぬる
    fill('white');
    circle(circles[i],circles[i+1],radius);

    //座標を更新
    circles[i]   += circles[i+2];
    circles[i+1] += circles[i+3];

    //端っこに行っていたらゲームオーバー

    if(circles[i]>canvas_width+radius||circles[i]<-radius||circles[i+1]>canvas_height+radius||circles[i+1]<-radius){
      is_gameover = 1;
    }
    
  }

  //key操作で色をつける

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
}

function keyPressed(){
  for(let i=0;i<4;i++) for(let j=0;j<4;j++){
    if(keyIsDown(raw[i])&&keyIsDown(col[j])&&key==' '){
      fill(255,0,0,alpha);
      rect(i*100,j*100,100,100);
      let how_many_erased = 0;

      //配列の一部を消しながら探索するので添字は逆順で見る
      for(let k = circles.length-4;k>=0;k-=4){

        if(i*100<=circles[k]&&circles[k]<=i*100+100){
          if(j*100<=circles[k+1]&&circles[k+1]<=j*100+100){
            circles.splice(k,4);
            how_many_erased++;
            if(how_many_erased==0) score+=10;
            else score+=30;
          }
        }

      }

      if(how_many_erased==0){
        life--;
        if(life==0) is_gameover=1;
      }
    }
  }

}

