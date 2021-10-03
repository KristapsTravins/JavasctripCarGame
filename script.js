const game = window.document.querySelector('#gameWind');
const mainCar = window.document.querySelector('#mainCar');
const actionBox = window.document.querySelector('#actionBox');
const textScore = window.document.querySelector('h1');
const textLoose = window.document.querySelector('h2');
let score = 0;
// add game window height ... 
let step = 10 ;
let carHeight = 113;
let carWidth = 58;
let actionBoxWidth = 452; 
game.style.height = window.innerHeight - 5 + 'px';
mainCar.style.top = window.innerHeight - carHeight -5 + 'px';
let tops = parseInt(mainCar.style.top);
let getRand = (max) =>Math.floor(Math.random()*max);
const carColors = ['-160px -127px','-211px -245px','-160px -368px',];
const oCar = window.document.getElementById('obsticleCar');
const actBox = window.document.getElementById('actionBox');



class ObsticleCar {
    constructor(){
        this.type = 'div',
        this.outerId = `obsticleBox${getRand(100)}`,
        this.innerId = `obsticleCar${getRand(100)}`,
        this.startPos = `-${carHeight}px`,
        this.sidePos = `${getRand(actionBoxWidth)}px`,
        this.classOfBox = 'obsticleBox',
        this.classOfObs = 'obsticleCar'
    }
} 

const render =()=>{
    let obst = new ObsticleCar();
    let obsticBox = document.createElement(obst.type);
    obsticBox.classList.add(obst.classOfBox);
    obsticBox.id =`${obst.outerId}`;
    let obsticCar = document.createElement(obst.type);
    obsticCar.classList.add(obst.classOfObs);
    obsticCar.id =`${obst.innerId}`;
    obsticCar.style.left = obst.sidePos;
    obsticCar.style.top = obst.startPos;
    obsticCar.style.backgroundPosition = carColors[getRand(3)];
    obsticBox.appendChild(obsticCar);
    actionBox.appendChild(obsticBox);
    const a =  setInterval(()=>{
    let currentTopPos = parseInt(obsticCar.style.top);
    obsticCar.style.top = currentTopPos + 5 + 'px';
    McarX=  parseInt(obsticCar.style.left);
    OcarX = parseInt(mainCar.style.left);
    McarY = parseInt(mainCar.style.top);
       
       let startline = OcarX;
       let endline = OcarX+carWidth ; 
       if(McarX+carWidth>startline&&McarX<endline&&McarY-carHeight<currentTopPos){
       console.log('------------------------crash----------------------------');
       textLoose.innerHTML=`YOU LOSE`;
       clearInterval(a)
       }



        if(currentTopPos > window.innerHeight){
            obsticCar.style.top = 0 + 'px';
            obsticCar.style.left = `${getRand(actionBoxWidth-carWidth)}px`;
            obsticCar.style.backgroundPosition = `${carColors[getRand(3)]}`;
            score ++;
            textScore.innerHTML = `Score: ${score}`;
        }
        
    },10) 
};


render();

 











window.document.body.addEventListener('keydown', (event)=>{
 switch (event.key){
  case "ArrowRight":
        mainCar.removeAttribute("class");
        mainCar.classList.add("rightMove");
        const currentLeft = parseInt(mainCar.style.left);
        if(currentLeft < actionBoxWidth- carWidth){
        mainCar.style.left = currentLeft + step + 'px';
        }
        break;
  case "ArrowLeft":
        mainCar.removeAttribute("class");
        mainCar.classList.add("leftMove");
        const currentRight = parseInt(mainCar.style.left);
        if(currentRight>0){
        mainCar.style.left = currentRight - step + 'px';
        }
        break;
 }

});

