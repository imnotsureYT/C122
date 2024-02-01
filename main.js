screen_width = 0;
screen_height = 0;

apple = "";
draw_apple = "";
speak_data = "";

to_number = 0;

x = 0;
y = 0;

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start()
{
    document.getElementById('status').innerHTML = "System is listening please speak."
    recognition.start();
}

function speak()
{
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data="";
}

function preload()
{
    apple = loadImage('https://i.postimg.cc/vBR68dGH/clip-art-apple-free-clipart.png');
}

recognition.onresult = function(event)
{
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById('status').innerHTML = "The Speech has been recognized as : "+content;
    to_number = Number(content);
    console.log(to_number);
    if(Number.isInteger(to_number))
    {
        document.getElementById('status').innerHTML = "Started drawing apple";
        draw_apple = "set";
    } else
    {
        document.getElementById('status').innerHTML = "The Speech has not recognized as a number : "+content;
        // draw_apple = "";
    }
}

function setup()
{
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width, screen_height-150);
    canvas.position(0, 150);
}

function draw()
{
    if (draw_apple=="set")
    {
        for (var i = 1; i<=to_number; i++)
        {
            console.log(to_number+" apple");
            image(apple, Math.floor(Math.random()*900), Math.floor(Math.random()*600), 30, 30);
        }
        document.getElementById('status').innerHTML = to_number+" Apples drawn";
        speak_data = to_number + "Apples Drawn";
        speak();
        draw_apple="";
    }
}