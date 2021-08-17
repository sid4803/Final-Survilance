Objects=[];
status="";
video="";
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        ObjectDetector.detect(video,gotResult);
        for(i=0;i<Objects.length;i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number_of_objects Detected "+Objects.length;
            fill("#FF0000");
          percent = floor(Objects[i].confidence * 100);
          text(Objects[i].label + " " + percent + "%", Objects[i].x + 15, Objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
               }
    }
}
function start(){
    ObjectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:Object Detecting";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
    if(error){
     console.log(error);
    }
    console.log(results);
 Objects=results;
}