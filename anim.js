var horloge=document.getElementById("horloge");
var contexte=horloge.getContext("2d");
const horaire=document.getElementById("horaire");
var rayon = horloge.height / 2;
contexte.translate(rayon, rayon);
rayon = rayon * 0.85;
const toBinary = (n) => {
      if (n === 0 || n === 1) {
        return String(n)
      }
      return toBinary(Math.floor(n / 2)) + String(n % 2)
    }

function drawFace(contexte, rayon) {
  var grad;
  contexte.beginPath();
  contexte.arc(0, 0, rayon, 0, 2*Math.PI);
  contexte.fillStyle = 'white';
  contexte.fill();
  grad = contexte.createRadialGradient(0,0,rayon*0.95, 0,0,rayon*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'yellow');
  grad.addColorStop(1, '#333');
  contexte.strokeStyle = grad;
  contexte.lineWidth = rayon*0.1;
  contexte.stroke();
  contexte.beginPath();
  contexte.arc(0, 0, rayon*0.1, 0, 2*Math.PI);
  contexte.fillStyle = '#333';
  contexte.fill();
}

function drawNumbers(contexte, rayon) {
  var ang;
  var num;
  contexte.font = rayon*0.15 + "px arial";
  contexte.textBaseline="middle";
  contexte.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    contexte.rotate(ang);
    contexte.translate(0, -rayon*0.85);
    contexte.rotate(-ang);
    contexte.fillText(num.toString(), 0, 0);
    contexte.rotate(ang);
    contexte.translate(0, rayon*0.85);
    contexte.rotate(-ang);
  }
}

function drawTime(contexte, rayon){
    var heureActuelle = new Date();
    var heure = heureActuelle.getHours();
    var minute = heureActuelle.getMinutes();
    var seconde = heureActuelle.getSeconds();
    
    heure=heure%12;
    heure=(heure*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (seconde*Math.PI/(360*60));
    drawHand(contexte, heure, rayon*0.5, rayon*0.07); 
    //minute
    minute=(minute*Math.PI/30)+(seconde*Math.PI/(30*60));
    drawHand(contexte, minute, rayon*0.8, rayon*0.07); 

    seconde=(seconde*Math.PI/30);
    drawHand(contexte, seconde, rayon*0.9, rayon*0.02, 'navy');
    horaire.innerHTML = `${toBinary(heureActuelle.getHours())} : ${toBinary(heureActuelle.getMinutes())}`
    seconde++


}
function drawHand(contexte, pos, length, width, color = 'black') {
    contexte.beginPath();
    contexte.strokeStyle = color;
    contexte.lineWidth = width;
    contexte.lineCap = "round";
    contexte.moveTo(0,0);
    contexte.rotate(pos);
    contexte.lineTo(0, -length);
    contexte.stroke();
    contexte.rotate(-pos);
}
function drawClock() {
  drawFace(contexte, rayon);
  drawNumbers(contexte, rayon);
  drawTime(contexte, rayon);
  }
setInterval(drawClock, 1000);

