async function SWW(){
  const planets = ["Hoth", "Naboo", "tatooine"]
  let senseData = await fetch('/sense-data');
  senseData = await senseData.json();

  if (senseData.temp <= 10){
    changeBG(planets[0], senseData.temp);
  }
  if (senseData.temp > 10){
    changeBG(planets[1], senseData.temp);
  }
  if (senseData.temp > 25){
    changeBG(planets[2], senseData.temp);
  }



}

function changeBG(planet, temp) {
  const body = document.querySelector('body');
  const weatherP = document.querySelector('.weatherP');

  weatherP.textContent = `Woah, it's ${temp} degrees. It's like ${planet} out there.`
}

SWW();