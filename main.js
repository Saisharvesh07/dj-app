Song1 = "";
Song2 = "";
Song1_status = "";
Song2_status = "";

function preload() {
    Song1 = loadSound("music.mp3");
    Song2 = loadSound("music_2.mp3");
}

rightWristX = 0;
rightWristY = 0;


leftWristX = 0;
leftWristY = 0;


scoreRightWrist = 0;
scoreLeftWrist = 0;


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCanvas(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWrist = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY  = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY  = " + rightWristY);

    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    Song1_status = Song1.isPlaying();
    Song2_status = Song2.isPlaying();
    fill("#f7003a");
    stroke("#f7003a");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        Song2.stop();
        if(Song1_status == false){
        Song1.play();
        document.getElementById("Song").innerHTML = "playing minecraft"
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        Song1.stop();
        if(Song2_status == false){
        Song2.play();
        document.getElementById("Song").innerHTML = "playing avengers"
        }
    }
}



function play()
 {
    song.play();
    song.setVolume(1);
    song.rate(1);
}