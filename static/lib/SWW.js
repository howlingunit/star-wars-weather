const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function SWW(){
  const planets = ["Hoth", "Naboo", "Tatooine"]
  while (true){
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
    await sleep(5000)
  }



}

function changeBG(planet, temp) {
  // const body = document.querySelector('body');
  const weatherP = document.querySelector('.weatherP');

  weatherP.textContent = `Woah, it's ${temp.toPrecision(3)} degrees. It's like ${planet} out there.`
  document.body.style.backgroundImage = `url('./assets/${planet.toLowerCase()}.jpg')`;
}

SWW();