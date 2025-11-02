class FailErase{
    
    constructor(){
        this.vecX = [];
        this.vecY = [];
        this.alpha= [];
        this.size = [];
    }

    add(posX,posY){
        this.vecX.push(posX);
        this.vecY.push(posY);
        this.alpha.push(255);
        this.size.push(250);
    }

    draw(){
        strokeWeight(0);
        textAlign(CENTER);
        for(let i=this.vecX.length-1;i>=0;i--){
            textSize(this.size[i]);
            fill(0,0,0,this.alpha[i]);
            text("×",marginWidth + insideWidth*(1/4*this.vecX[i]+1/8), marginHeight + insideHeight*(1/4*this.vecY[i]+1/8));
            this.alpha[i]*=0.97;
            this.size[i] *=0.95;
            if(this.alpha[i]<0.01){
                this.vecX.splice(i,1);
                this.vecY.splice(i,1);
                this.alpha.splice(i,1);
                this.size.splice(i,1);
            }
        }
        textAlign(LEFT); 
        strokeWeight(1);
    }
    
}