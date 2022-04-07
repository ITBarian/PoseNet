let capture
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;

function setup() { // funcio d'inici (un sol cop quan s'obri l'aplicacio)
    createCanvas(800, 500); 
    //console.log("setup function"); 
    capture = createCapture(VIDEO); 
    capture.hide(); 
    // aqui feim la carrega del fitxer ml5
    posenet = ml5.poseNet(capture, console.log("model has loaded")); 
    // detectem les poses
    posenet.on('pose', recievedPoses);

    // feim la carrega de les imatges a les variables
    ri1 = loadImage('images/ri1.png');
    ri2 = loadImage('images/ri2.png');
    ri3 = loadImage('images/ri3.png');
}
    
// amb aquesta funcio rebem les poses
function recievedPoses (poses) {
    console.log(poses); 
    if(poses.length > 0) {
        singlePose = poses[0].pose; 
        skeleton = poses[0].skeleton;
    }
}

/*
function draw() { 
    background(200);
    //1.point 
    point(200, 200);
    //2. line 
    line(200, 200, 300, 300);
    //3.trialgle 
    triangle(100, 200, 300, 400, 150, 250);
    //4. rectangle 
    rect(250, 200, 200, 100);
    //5. circle 
    ellipse(100, 200, 100, 100); 
    // color circle using stroke and fill 
    r = getRandomArbitrary(0, 255); 
    g = getRandomArbitrary(0, 255); 
    b = getRandomArbitrary(0, 255); 
    fill(r,g,b); 
    ellipse(mousex, mousey, 50, 50);
    
    fill(127, 102, 34); 
    stroke (255, 0, 0); 
    ellipse(100, 200, 100, 100); 
    stroke(0, 255, 0); 
    ellipse( 300, 320, 100, 100); 
    stroke(0, 0, 255); 
    ellipse(400, 400, 100, 100);
    
}
*/

function draw() { // aquesta funcio esta en un loop constant dibuixant les poses per a la captura de video
    
    // images and video(webcam)
    image(capture, 0, 0);
    r = getRandomArbitrary(0, 255); 
    g = getRandomArbitrary(0, 255); 
    b = getRandomArbitrary(0, 255); 
    fill(r,g,b); // feim que el color dels cercles sigui aleatori
    
    if(singlePose) { // if someone is captured then only
        // capturem totes les poses i dibuixem un cercle amb el tamany aleatori
        for(let i=0; i<singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, getRandomArbitrary(10, 35));
        }

        stroke(255, 255, 255);
        strokeWeight(5);
        // construim l'esquelet unint els punts per linies
        for(let j=0; j<skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        // carreguem les imatges en dos llocs concrets agafant com a referencia el cercle del nas
        image(ri2, singlePose.nose.x-40, singlePose.nose.y-70, 125, 125);
        image(ri3, singlePose.nose.x-35, singlePose.nose.y+28, 50, 50);
    }
}

function getRandomArbitrary(min, max) { // funcio per a generar un numero aleatori entre un minim i un maxim donat
    return Math.random() * (max - min) + min;
}
