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
let isGetBonus=1;
let allClearTimer=0;

let combo = 0;




function setup() {
  createCanvas(canvas_width, canvas_height);
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
  cntdown_timer=-1;
  combo = 0;
}
function mousePressed(){
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
      if(is_gameover)continue;
      fill(255,0,0,alpha);
      rect(i*quarter_height,j*quarter_width,quarter_height,quarter_width);
      let how_many_erased = 0;

      //配列の一部を消しながら探索するので添字は逆順で見る
      for(let k = circles.length-4;k>=0;k-=4){

        if(i*quarter_width<=circles[k]&&circles[k]<=(i+1)*quarter_width){
          if(j*quarter_height<=circles[k+1]&&circles[k+1]<=(j+1)*quarter_height){
            circles.splice(k,4);
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
  background(220);

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

    makeGameoverScreen();
    return;

  }

  if(circles.length==0&&cnt_frame>60||allClearTimer){
    if(!allClearTimer&&circles.length==0) allClearTimer=60;
    makeAllCrear();
    allClearTimer--;
    if(!isGetBonus&&circles.length==0){
      score+=100;
      isGetBonus=1;
    }
  }

  if(cnt_frame%freq_cir==0){
    add_circle();
  }


  drawMoveCircle();

  judgeGameover();

  //key操作で色をつける
  color_line();

}
