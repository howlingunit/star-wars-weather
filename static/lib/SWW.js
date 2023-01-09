async function SWW() {
  // const planets = ['Hoth', 'Naboo', 'Tatooine'];

  const planets = {
    freezing: [
      {title: 'Hoth', img: 'hoth.jpg', theme: 'light'}, 
      {title: 'Kijimi', img: 'kijimi.jpg', theme: 'light'}
    ],
    cold: [
      {title: 'Eadu', img: 'eadu.jpg', theme: 'light'}, 
      {title: 'Kamino', img: 'kamino.jpg', theme: 'light'}
    ],
    warm: [
      {title: 'coruscant', img: 'coruscant.jpg', theme: 'dark'}, 
      {title: 'naboo', img: 'naboo.jpg', theme: 'light'}, 
      {title: 'Forest Moon of Endor', img: 'endor.jpg', theme: 'light'}
    ],
    hot: [
      {title: 'Dagobah', img: 'dagobah.jpg', theme: 'light'}, 
      {title: 'Tatooine', img: 'tatooine.jpg', theme: 'light'}, 
      {title: 'Mustafar', img: 'mustafar.jpg', theme: 'dark'}
    ],
  }

  let senseData = await fetch('/latest-temp');
  senseData = await senseData.json();

  if (senseData.temp <= 0) {
    changeBG(planets.freezing[Math.floor(Math.random() * planets.freezing.length)], senseData.temp, senseData.date);
  }
  if (senseData.temp > 0 && senseData.temp <= 10) {
    changeBG(planets.cold[Math.floor(Math.random() * planets.cold.length)], senseData.temp, senseData.date);
  }
  if (senseData.temp > 10 && senseData.temp <25) {
    changeBG(planets.warm[Math.floor(Math.random() * planets.warm.length)], senseData.temp, senseData.date);
  }
  if (senseData.temp >= 25) {
    changeBG(planets.hot[Math.floor(Math.random() * planets.hot.length)], senseData.temp, senseData.date);
  }
}

function changeBG(planet, temp, epoch) {
  const weatherP = document.querySelector('.weatherP');
  const timeP = document.querySelector('.time');
  const burgerButton = document.querySelector('.burgerButton');
  const time = new Date(epoch / 1000000);

  timeP.textContent = `Reading taken at ${time.toLocaleString()}`;
  weatherP.textContent = `Woah, it's ${temp.toPrecision(3)} °C. It's like ${planet.title} out there.`;
  document.body.style.backgroundImage = `url('./assets/${planet.img}')`;

  weatherP.classList.add(`${planet.theme}-theme`);
  timeP.classList.add(`${planet.theme}-theme`);
  burgerButton.classList.add(`${planet.theme}-theme`);


}

SWW();
