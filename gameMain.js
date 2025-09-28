function add_circle(){
    isGetBonus=0;
    let start_x = floor(random(0,canvas_width/quarter_width))*backet+backet/2;//4つのレーンからランダムに
    let start_y = floor(random(0,canvas_height/quarter_height))*backet+backet/2;//4つのレーンからランダムに

    // circles.push(start_x,canvas_height+radius,0,-speed_y);

    let direction = max(0,floor(random(-2,4)));
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
function drawMoveCircle(){

  //y方向に少しずつ加速する
  speed_x+=acc_x;
  speed_y+=acc_y;


  for(let i = 0;i < circles.length;i += 4){

    //今の座標でぬる
    fill('white');
    circle(circles[i],circles[i+1],radius*2);

    //座標を更新
    circles[i]   += circles[i+2];
    circles[i+1] += circles[i+3];

    
  }

}

function judgeGameover(){
    //端っこに行っていたらゲームオーバー
    for(let i=0;i<circles.length; i+=4){

      if(circles[i+3]>0&&circles[i+1]>canvas_height) is_gameover=1;
      if(circles[i+3]<0&&circles[i+1]<0) is_gameover=1;
      if(circles[i+2]>0&&circles[i]>canvas_width) is_gameover=1;
      if(circles[i+2]<0&&circles[i]<0) is_gameover=1;

      if(is_gameover&&over_circle_idx==-1){
        over_circle_idx = i;
      }
    }

}

