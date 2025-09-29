class Meteor{
    constructor(_direction,_radius=radius,_isDiagonal=0){
    // constructor(_direction,_radius=radius){
        isGetBonus=0;
        this.direction=_direction;
        this.radius = _radius;
        this.isBeforeEnterCanvas = true;
        this.isDiagonal=_isDiagonal;
        // this.ay = gravity;
        if(_direction==0){
            this.x=canvas_width*0.25*(floor(random(0,4))+0.5);
            this.y=-_radius;

            if(!this.isDiagonal) this.vx=0;
            else this.vx=this.x<canvas_width*0.5?1:-1;
            this.vy=speed_y;
        }
        if(_direction==1){
            this.x=-_radius;
            this.y=canvas_height*0.25*(floor(random(0,3))+0.5);

            this.vx=speed_x;
            if(!this.isDiagonal) this.vy=0;
            else this.vy=this.y<canvas_height*0.5?1:-1;
        }
        if(_direction==2){
            this.x=canvas_width*0.25*(floor(random(0,4))+0.5);
            this.y=canvas_height+_radius;

            if(!this.isDiagonal) this.vx=0;
            else this.vx=this.x<canvas_width*0.5?1:-1;
            this.vy=-speed_y;
        }
        if(_direction==3){
            this.x=canvas_width+_radius;
            this.y=canvas_height*0.25*(floor(random(0,3))+0.5);

            this.vx=-speed_x;
            if(!this.isDiagonal) this.vy=0;
            else this.vy=this.y<canvas_height*0.5?1:-1;
        }
    }
    move(){
        this.x+=this.vx;
        this.y+=this.vy;

        if(0<=this.x&&this.x<=canvas_width&&0<=this.y&&this.y<=canvas_height){
            this.isBeforeEnterCanvas=false;
        }
    }
    draw(){
        this.isDiagonal?fill('gray'):fill('white');
        circle(this.x,this.y,this.radius*2);
    }
    judgeOverCanvas(){
        if(this.isBeforeEnterCanvas)return false;
        else if(this.x<0||this.y<0||this.x>canvas_width||this.y>canvas_height) return true;
        else return false;
    }
}
