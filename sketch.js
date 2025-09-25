let cnt_frame = 0;
let circles = [];//円iは中心の座標が(circles[4*i],circles[4*i+1])で速度が(circles[4*i+2],circles[4*i+3])
let freq_cir = 60;
let radius = 15;
let speed_x = 1,speed_y = 1;//基本の円の落下速度
let first_speed_x = 1,first_speed_y = 1;//基本の円の落下の初速度
let acc_x=1/700;acc_y = 1/700;//1フレームごとの加速度。同じ円の加速度は0。新しい円の初速度がかわる
let alpha = 100;//行と列を選択したときの不透明度
let raw = [74,75,76,186];//jkl;
let col = [65,83,68,70]; //asdf
let is_gameover = 0;
let score = 0;
let life = 3;
let str = ['♡♡♡','♥♡♡','♥♥♡','♥♥♥'];
let canvas_height=400,canvas_width=400;
let over_circle_idx=-1;

let quarter_height=canvas_height/4,quarter_width=canvas_width/4;
let backet = 100;

let game_state = "select_course";
let cntdown_timer=-1;

function setup() {
  createCanvas(canvas_width, canvas_height);
  // createCanvas(windowWidth,windowHeight);
}


function add_circle(){
    let start_x = floor(random(0,canvas_width/quarter_width))*backet+backet/2;//4つのレーンからランダムに
    let start_y = floor(random(0,canvas_height/quarter_height))*backet+backet/2;//4つのレーンからランダムに

    // circles.push(start_x,canvas_height+radius,0,-speed_y);

    let direction = max(0,floor(random(-5,4)));
    if(cnt_frame<600) direction=0;
    // let direction = 3;

    // 10%で斜めのボールがでる
    if(random(0,10)<1){
      if(direction==0){
        circles.push(start_x,-radius);//出現座標
        if(start_x<canvas_width/2) circles.push(1,speed_y);
        else circles.push(-1,speed_y);
      }
      if(direction==1){
        circles.push(-radius,start_y);//出現座標
        if(start_y<canvas_height/2) circles.push(speed_x,1);
        else circles.push(speed_x,-1);
      }
      if(direction==2){
        circles.push(start_x,canvas_height+radius);//出現座標
        if(start_x<canvas_width/2) circles.push(1,-speed_y);
        else circles.push(-1,-speed_y);
      }
      if(direction==3){
        circles.push(canvas_height+radius,start_y);//出現座標
        if(start_y<canvas_height/2) circles.push(-speed_x,1);
        else circles.push(-speed_x,-1);
      }
    }
    else{
      if(direction==0){
        circles.push(start_x,-radius);//出現座標
        circles.push(0,speed_y);
      }
      if(direction==1){
        circles.push(-radius,start_y);//出現座標
        circles.push(speed_x,0);
      }
      if(direction==2){
        circles.push(start_x,canvas_height+radius);//出現座標
        circles.push(0,-speed_y);
      }
      if(direction==3){
        circles.push(canvas_height+radius,start_y);//出現座標
        circles.push(-speed_x,0);
      }
    }
    // else if(cnt_frame>0&&random(0,5)<1){
    // else if(1){
    //   circles.push(start_x,canvas_height+radius);//出現座標
    //   circles.push(0,-speed_y);
    //   // if(start_x<canvas_width/2) circles.push(0,-speed_y);
    //   // else circles.push(0,-speed_y);
    // }
    // else{
    //   circles.push(start_x,-radius);
    //   circles.push(speed_x,speed_y);
    // }
}

function draw_circle(){
  for(let i = 0;i < circles.length;i += 4){

    //今の座標でぬる
    fill('white');
    circle(circles[i],circles[i+1],radius*2);

    //座標を更新
    circles[i]   += circles[i+2];
    circles[i+1] += circles[i+3];

    //端っこに行っていたらゲームオーバー

    if(circles[i+3]>0&&circles[i+1]>canvas_height) is_gameover=1;
    if(circles[i+3]<0&&circles[i+1]<0) is_gameover=1;
    if(circles[i+2]>0&&circles[i]>canvas_width) is_gameover=1;
    if(circles[i+2]<0&&circles[i]<0) is_gameover=1;

    if(is_gameover&&over_circle_idx==-1){
      over_circle_idx = i;
    }
    
  }

}

function init(){
  cnt_frame =0;
  is_gameover = 0;
  circles = [];
  score = 0;
  life = 3;
  speed_x=first_speed_x;
  speed_y=first_speed_y;
  game_state="prepared";
}

function draw() {
  cnt_frame++;
  background(220);



  if(game_state=="select_course"){
    fill(255,255,0,alpha);
    rect(quarter_width*0.8,quarter_height*0.8,quarter_width*2.4,quarter_height*0.8);
    fill(0,0,255,alpha);
    rect(quarter_width*0.8,quarter_height*2.4,quarter_width*2.4,quarter_height*0.8);
    return;
  }

  if(game_state=="prepared"){
    fill(0);
    textSize(80);
    if(cntdown_timer!=-1){
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

    else{
      textAlign(CENTER);
      textSize(20);
    strokeWeight(0);
      text("push Space",canvas_width/2,canvas_height/4*3);
    strokeWeight(1);
    }



    // game_state="playing";
    // init();
    return;
  }


  textAlign(LEFT);

  strokeWeight(0);
  fill(0);
  textSize(40);
  text(score,10,40);
  fill(255,0,0);
  textSize(30);
  text(str[life],canvas_width-100,40);
  strokeWeight(1);

  if(is_gameover){
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
    // text(circles[over_circle_idx],30,30);
    // text(circles[over_circle_idx+1],60,80);
    stroke(0);
    strokeWeight(1);
    return;

  }

  if(cnt_frame%freq_cir==0){
    add_circle();
  }

  //y方向に少しずつ加速する
  speed_x+=acc_x;
  speed_y+=acc_y;



  //ボールの描画、位置の修正
  draw_circle();

  //key操作で色をつける
  color_line();

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

function mousePressed(){
    fill(255,255,0,alpha);
    rect(quarter_width*0.8,quarter_height*0.8,quarter_width*2.4,quarter_height*0.8);
    fill(0,0,255,alpha);
    rect(quarter_width*0.8,quarter_height*2.4,quarter_width*2.4,quarter_height*0.8);
  if(game_state =="select_course"){
    if(quarter_width*0.8<=mouseX&&mouseX<=quarter_width*0.8+quarter_width*2.4){
      if(quarter_height*0.8<=mouseY&&mouseY<=quarter_height*0.8+quarter_height*0.8){
        game_state = "prepared";
      }
    }
  }
}

function keyPressed(){
  for(let i=0;i<4;i++) for(let j=0;j<4;j++){
    if(keyIsDown(raw[i])&&keyIsDown(col[j])&&key==' '){
      fill(255,0,0,alpha);
      rect(i*quarter_height,j*quarter_width,quarter_height,quarter_width);
      let how_many_erased = 0;

      //配列の一部を消しながら探索するので添字は逆順で見る
      for(let k = circles.length-4;k>=0;k-=4){

        if(i*quarter_width<=circles[k]&&circles[k]<=(i+1)*quarter_width){
          if(j*quarter_height<=circles[k+1]&&circles[k+1]<=(j+1)*quarter_height){
            circles.splice(k,4);
            how_many_erased++;
            if(how_many_erased==0) score+=10;
            else score+=30;
          }
        }

      }

      if(how_many_erased==0){
        if(life>0) life--;
        if(life==0) is_gameover=1;
      }
    }
  }

  if(key=='r'){
    init();
  }
  if(key=='w'){
    fullscreen(1);
  }
  if(key=='q'){
    fullscreen(0);
  }
  // if(key=='z'){
  //   if(game_state=="prepared") game_state="select_course";
  //   if(game_state=="playing") game_state=""
  // }

  if(game_state == "prepared" && key==' '){
    cntdown_timer = 180;
  }


}

