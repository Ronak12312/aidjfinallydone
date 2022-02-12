slw=0;
srw=0;
rx=0;
ry=0;
lx=0;
ly=0;
song="";
function preload(){
    song=loadSound("h.mp3");
}
function p(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,ml);
    posenet.on("pose",gotresults);
}
function ml(){
    console.log("posenet loaded");
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(slw>0.2){
    circle(lx,ly,20);
    inlw=Number(ly);
    rdl=Math.floor(inwl);
    d500=rdl/400;
    document.getElementById("f").innerHTML="volume="+d500;
    song.setVolume(d500);
    }
    if(srw>0.2){
    circle(rx,ry,20);
    if(ry>0 && ry<=100){
        document.getElementById("b").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(ry>100 && ry<=200){
        document.getElementById("b").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(ry>200 && ry<=300){
        document.getElementById("b").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(ry>300 && ry<=400){
        document.getElementById("b").innerHTML="speed=2x";
        song.rate(2);
    }
    }
}
function gotresults(results){
if(results.length>0){
    console.log(results);
    rx=results[0].pose.rightWrist.x;
    ry=results[0].pose.rightWrist.y;
    console.log(rx+"      "+ry);
    lx=results[0].pose.leftWrist.x;
    ly=results[0].pose.leftWrist.y;
    console.log(lx+"      "+ly);
    slw=results[0].pose.keypoints[9].score;
    srw=results[0].pose.keypoints[10].score;
}
}