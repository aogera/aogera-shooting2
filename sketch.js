let cnt_frame = 0;
// let circles = [];//円iは中心の座標が(circles[4*i],circles[4*i+1])で速度が(circles[4*i+2],circles[4*i+3])
let meteors = [];
let freq_cir = 60;
let radius = 15;
let speed_x = 1,speed_y = 1;//基本の円の落下速度
let first_speed_x = 1,first_speed_y = 1;//基本の円の落下の初速度
let acc_x=0.1,acc_y=0.1;
// let gravity=0.01;
let alpha = 100;//行と列を選択したときの不透明度
let raw = [74,75,76,186];//jkl;
let col = [65,83,68,70]; //asdf
let is_gameover = 0;
let score = 0;
let life = 3;
let str = ['♡♡♡','♥♡♡','♥♥♡','♥♥♥'];

let canvasHeight=500,canvasWidth=500;
let marginHeight=70,marginWidth=70;
let insideHeight=canvasHeight-marginHeight*2,insideWidth=canvasWidth-marginWidth*2;

let over_circle_idx=-1;

let quarter_height=canvasHeight/4,quarter_width=canvasWidth/4;
let backet = 100;

let game_state = "select_course";
let cntdown_timer=-1;
let isGetBonus=1;
let allClearTimer=0;

let combo = 0;

let shakeCanvas;

let gameMode=-1;

let meteorData;

let isPushed = 0;

function setup() {
  meteorData = loadJSON('data.json');
  shakeCanvas=new ShakeCanvas();
  createCanvas(canvasWidth, canvasHeight);
}


function init(){
  shakeCanvas=new ShakeCanvas();
  cnt_frame =0;
  is_gameover = 0;
  meteors = [];
  score = 0;
  life = 3;
  speed_x=first_speed_x;
  speed_y=first_speed_y;
  game_state="prepared";
  cntdown_timer=-1;
  combo = 0;
  isPushed=0;
}
function mousePressed(){
  if(game_state =="select_course"){
    if(quarter_width*0.8<=mouseX&&mouseX<=quarter_width*0.8+quarter_width*2.4){
      if(quarter_height*0.8<=mouseY&&mouseY<=quarter_height*0.8+quarter_height*0.8){
        game_state = "prepared";
        gameMode = 1;
      }
    }
    if(quarter_width*0.8<=mouseX&&mouseX<=quarter_width*0.8+quarter_width*2.4){
      if(quarter_height*2.4<=mouseY&&mouseY<=quarter_height*2.4+quarter_height*0.8){
        game_state = "prepared";
        gameMode = 2;
      }
    }
  }
}

function keyPressed(){
  for(let i=0;i<4;i++) for(let j=0;j<4;j++){
    if(keyIsDown(raw[i])&&keyIsDown(col[j])&&key==' '){
      if(is_gameover)continue;

      let how_many_erased = 0;

      //配列の一部を消しながら探索するので添字は逆順で見る
      for(let k=meteors.length-1;k>=0;k--){
        if(marginWidth+i*insideWidth/4<=meteors[k].x+meteors[k].radius&&meteors[k].x-meteors[k].radius<=marginWidth+(i+1)*insideWidth/4){
          if(marginHeight+j*insideHeight/4<=meteors[k].y+meteors[k].radius&&meteors[k].y-meteors[k].radius<=marginHeight+(j+1)*insideHeight/4){
            meteors.splice(k,1);
            if(how_many_erased==0) score+=10+floor(combo**0.5);
            else score+=3*(10+floor(combo**0.5));
            how_many_erased++;
          }
        }
      }


      combo+=how_many_erased;

      if(how_many_erased==0){
        if(life>0) life--;
        if(life==0) is_gameover=1;
        combo=0;
      }
    }
  }

  if(key=='r'){
    init();
  }
 

  if(game_state == "prepared" && key==' '){
    cntdown_timer = 180;
  }


}

function draw() {
  cnt_frame++;
  background(200);
  strokeWeight(0);
  fill(240);
  rect(marginWidth,marginHeight,insideWidth,insideHeight);
  strokeWeight(1);


  //余白の大きさを変えられる
  // marginWidth+=0.1;
  // marginHeight+=0.1;
  // insideHeight=canvasHeight-marginHeight*2,insideWidth=canvasWidth-marginWidth*2;
  // insideHeight=canvasHeight-marginHeight*2,insideWidth=canvasWidth-marginWidth*2;






  shakeCanvas.shake();

  if(game_state=="select_course"){
    make_starttitle(quarter_width,quarter_height,alpha);
    return;
  }

  if(game_state=="prepared"){
    if(cntdown_timer!=-1){
      makePrepare();
    }
    else{
      readySpace();
    }
    return;
  }

  makeScores();

  if(is_gameover){
    if(shakeCanvas.beforeInit){
      shakeCanvas.init();
      shakeCanvas.beforeInit=false;
    }
    makeGameoverScreen();
    return;
  }

  if(meteors.length==0&&cnt_frame>60||allClearTimer>0){
    if(!allClearTimer&&meteors.length==0) allClearTimer=60;
    makeAllCrear();
    allClearTimer--;
    if(!isGetBonus&&meteors.length==0){
      score+=100;
      isGetBonus=1;
    }
  }
  if(gameMode==1){


    if(cnt_frame%freq_cir==0){
      let sx = floor(random(0,4));
      let sy = floor(random(0,4));
      let direction = floor(random(0,4));
      let dx = [0,0,1,-1],dy = [1,-1,0,0];
      let isDiagonal = floor(random(0,2));
    
      if(cnt_frame<300) direction=0,isDiagonal=0;
      meteors.push(new Meteor(
        (dx[direction]?-radius:marginWidth+insideWidth*(0.25*sx+0.125)),
        (dy[direction]?-radius:marginHeight+insideHeight*(0.25*sy+0.125)),
        (dx[direction]?speed_x:(isDiagonal?(sx<2?speed_x:-speed_x):0)),
        (dy[direction]?speed_y:(isDiagonal?(sy<2?speed_y:-speed_y):0))
      ));
    }

  }

  else if(gameMode==2&&isPushed==0){
    for(let i=0;i<5;i++){
      let t =meteorData[i%5]["Time"];
      let tx=meteorData[i%5]["X"];
      let ty=meteorData[i%5]["Y"];
      let vx=meteorData[i%5]["VelocityX"];
      let vy=meteorData[i%5]["VelocityY"];
      let r =meteorData[i%5]["Radius"]
      meteors.push(new Meteor(tx-t*vx,ty-t*vy,vx,vy,r));
    }
    isPushed=1;
  }

  // if(cnt_frame%60){
  //   gravity+=0.0001;
  // }



  for(let i=0;i<meteors.length;i++){
    meteors[i].move();
    meteors[i].draw();
    if(meteors[i].judgeOverCanvas()){
      is_gameover=1;
      over_circle_idx=i;
    }

  }

  speed_x += acc_x/(cnt_frame**0.9);
  speed_y += acc_y/(cnt_frame**0.9);

  //key操作で色をつける
  color_line();
}

