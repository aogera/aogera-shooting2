class Meteor{

    constructor(startX,startY,velocityX,velocityY,_radius=radius){
        isGetBonus=0;
        this.x=startX;
        this.y=startY;
        this.vx=velocityX;
        this.vy=velocityY;
        this.radius = _radius;
        this.isBeforeEnterCanvas = true;
    }

    move(){
        this.x+=this.vx;
        this.y+=this.vy;

        if(0<=this.x&&this.x<=canvas_width&&0<=this.y&&this.y<=canvas_height){
            this.isBeforeEnterCanvas=false;
        }
    }
    draw(){
        (this.vx!=0&&this.vy!=0)?fill('gray'):fill('white');
        circle(this.x,this.y,this.radius*2);
    }
    judgeOverCanvas(){
        if(this.isBeforeEnterCanvas)return false;
        else if(this.x<0||this.y<0||this.x>canvas_width||this.y>canvas_height) return true;
        else return false;
    }
}
