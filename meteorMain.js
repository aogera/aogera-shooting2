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

        if(marginWidth<=this.x&&this.x<=insideWidth+marginWidth&&marginHeight<=this.y&&this.y<=insideHeight+marginHeight){
            this.isBeforeEnterCanvas=false;
        }
    }
    draw(){
        (this.vx!=0&&this.vy!=0)?fill('gray'):fill('white');
        circle(this.x,this.y,this.radius*2);
    }
    judgeOverCanvas(){
        if(this.isBeforeEnterCanvas)return false;
        else if(this.x<marginWidth||this.y<marginHeight||this.x>insideWidth+marginWidth||this.y>insideHeight+marginHeight) return true;
        else return false;
    }
}
