let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');


let bird = new Image();
let bg = new Image();
let pipebottom = new Image();
let fg = new Image();
let pipeup = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.jpg";
pipebottom.src = "img/pipebottom.jpg";
fg.src = "img/fg.jpg";
pipeup.src = "img/pipeup.jpg";

let gap = 90;

// block create

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0,
};

// click event

document.addEventListener('click', moveUp);
function moveUp(){
    yPos -= 20;
}
let score = 0;

// bird position

let xPos = 5 ;
let yPos = 150;
let grav = 1;

function draw(){
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeup, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipebottom, pipe[i].x, pipe[i].y + pipeup.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeup.height) - pipeup.height,
            })
        }

        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeup.width 
            && (yPos <= pipe.y + pipeup.height ||
                (yPos + bird.height >= pipe[i].y + pipeup.height + gap))
                || yPos + bird.height >= cvs.height - fg.height
                ){
                    location.reload();
                }

                if(pipe[i].x == 5){
                    score++
                }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score:" + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
pipeup.onload = draw;