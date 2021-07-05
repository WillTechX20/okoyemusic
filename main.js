var song1=null;
var song2=null;
var canvas=null;
var video=null;
var rightWristXNum=null;
var rightWristYNum=null;
var rightWristScoreNum=null;
var leftWristXNum=null;
var leftWristYNum=null;
var leftWristScoreNum=null;
var poseNet=null;
var songNameDiv=document.querySelector('.song_name');

function preload(){
    song1=loadSound('sounds/song_1.mp3');
    song2=loadSound('sounds/song_2.mp3');
}

function gotPoses(results){
    leftWristXNum=results[0].pose.leftWrist.x;
    leftWristYNum=results[0].pose.leftWrist.y;
    rightWristXNum=results[0].pose.rightWrist.x;
    rightWristYNum=results[0].pose.rightWrist.y;
    leftWristScoreNum=results[0].pose.keypoints[9].score;
    rightWristScoreNum=results[0].pose.keypoints[10].score;
}

function onModelLoaded(){
    console.log('Model Loaded!');
}

function setup(){
    canvas=createCanvas(6500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, onModelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('lightblue');
    stroke('lightblue');
    circle(rightWristXNum, rightWristYNum, 20);
    circle(leftWristXNum, leftWristYNum, 20);
    if(leftWristScoreNum>rightWristScoreNum){
        song1.play();
        song2.stop();
        songNameDiv.innerText='Song Name: Happy Birthday to You';
    }else if(rightWristScoreNum>leftWristScoreNum){
        song2.play();
        song1.stop();
        songNameDiv.innerText='Song Name: Twinkle, Twinkle, Little Star';
    }else{
        song1.stop();
        song2.stop();
        songNameDiv.innerText='Song Name: None';
    }
}
