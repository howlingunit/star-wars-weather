async function SWW(){
  const planets = ["Hoth", "Naboo", "Tatooine"]
  let senseData = await fetch('/latest-temp');
  senseData = await senseData.json();

  if (senseData.temp <= 10){
    changeBG(planets[0], senseData.temp, senseData.date);
  }
  if (senseData.temp > 10){
    changeBG(planets[1], senseData.temp, senseData.date);
  }
  if (senseData.temp > 25){
    changeBG(planets[2], senseData.temp, senseData.date);
  }



}

function changeBG(planet, temp, epoch) {
  // const body = document.querySelector('body');
  const weatherP = document.querySelector('.weatherP');
  const timeP = document.querySelector('.time');
  const time = new Date(epoch / 1000000);

  timeP.textContent = `Reading taken at ${time.toLocaleString()}`;
  weatherP.textContent = `Woah, it's ${temp.toPrecision(3)} degrees. It's like ${planet} out there.`;
  document.body.style.backgroundImage = `url('./assets/${planet.toLowerCase()}.jpg')`;
}

SWW();