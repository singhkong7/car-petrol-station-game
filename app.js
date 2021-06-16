const gameDiv = document.querySelector('.game')
let petrolPumpLocation
let carPetrol 
let totalDistance 
let distanceCovered 
let move 
var x=false

document.querySelector('.start button').addEventListener('click', ()=>{
  if (!x)
  {
    gameInit()
    x=true;
  }
 else{
   document.querySelector(".game").innerHTML="<h2>Car Game</h2>"
   x=false
 }
})





// game initializes after clicking the start button
function gameInit() {
  gameDiv.innerHTML = ''
   petrolPumpLocation = generatePumpLocation()
   carPetrol = 50
   totalDistance = 100
   distanceCovered = 0
   move = 0;
  startGame()
}


function startGame (){
  move = move + 1
  let carDistance = carMove()
  distanceCovered = distanceCovered + carDistance
  let prevDistance = distanceCovered - carDistance
  
  carPetrol = carPetrol - (carDistance * 2) 
  let prevPetrol = carPetrol + (carDistance * 2)
  if(petrolPumpLocation.includes(distanceCovered)){
    carPetrol = carPetrol + 30 
    generateHTML('Petrol Refill +30L', 'green')
  }
  
  if(carPetrol <= 0){
    carPetrol = 0
    prevDistance = prevDistance + (prevPetrol / 2)
    generateHTML(`Move ${move} - Car at ${prevDistance}KM, Petrol Remaining ${carPetrol}L`)
    generateHTML('Petrol is finished, GAME OVER', 'red')
    return
  }
 

  if(distanceCovered < 100){
    generateHTML(`Move ${move} - Car at ${distanceCovered}KM, Petrol Remaining ${carPetrol}L`)
    startGame()
  }else{
    prevPetrol = prevPetrol - ((100 - prevDistance) * 2)
    generateHTML(`Move ${move} - Car at ${100}KM, Petrol Remaining ${prevPetrol}L`)
    generateHTML('Car reaches destination, CONGRATULATIONS!!!', 'blue')
    return
  }
  return
}

// to generate random pump location
function generatePumpLocation(){
  let petrolPumpLocation = []
  for (let i = 0; i < 6; i++) {
    petrolPumpLocation.push(Math.floor(Math.random() * 100) )
    
  }
  petrolPumpLocation = petrolPumpLocation.sort((a, b) => a - b)
  generateHTML(`Petrol Pumps Location at: ${petrolPumpLocation.join(', ')}`)
  return petrolPumpLocation;
}

// moves car between 0 and 6km
function carMove(){
  let distance = ((Math.floor(Math.random() * 5)) + 1)
  return distance
}

// grnrates the html and logs on conslole
function generateHTML(text, className){
  let Class = className || '' ;
  console.log(text);
  gameDiv.innerHTML += `<p class='${Class}'>${text}<p/>`
}


