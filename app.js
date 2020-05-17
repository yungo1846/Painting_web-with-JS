const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("color")
const range = document.getElementById("range");
const fill_button = document.getElementById("Fill");
const save_button = document.getElementById("Save");

const line_width = 3;
const canvas_size = 700;
canvas.width = canvas_size;
canvas.height = canvas_size;

ctx.lineWidth = line_width;
ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);


var painting = false;
var fill = false;

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    if (fill){
        ctx.fillRect(0,0,canvas_size,canvas_size);
    }
}

function paint(){
    painting = true;
}

function stop_paint(){
    painting = false;
}

function coordinate(event){
    var x = event.offsetX;
    var y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleRange(){
    ctx.lineWidth = event.target.value;
}

function fill_color(){
    if (!fill){
        fill = true;
        fill_button.innerText = "paint";
    }
    else{
        fill = false;
        fill_button.innerText = "fill";
    }
}

function download(){
    var image = canvas.toDataURL(); 
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "work";
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove",coordinate);
    canvas.addEventListener("mousedown",paint);
    canvas.addEventListener("mouseup", stop_paint);
    range.addEventListener("input", handleRange);
    fill_button.addEventListener("click", fill_color);
    save_button.addEventListener("click", download);
}


Array.from(colors).forEach(function (color){
    color.addEventListener("click", changeColor);
})
console.log(Array.from(colors));