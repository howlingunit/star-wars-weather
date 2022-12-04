const out = document.querySelector('#avg-temp');

let data = await fetch('/months-avg');
data = await data.json();

// change data from {xx:yyyyyyyy} to [{month:yyyyyyyy}, {month:yyyyyy}]
// doing this to organise and display

const months = {
  '01': 'January',
  '02': 'Febuary',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

const organisedData = [];

Object.keys(data).sort().forEach((month) => {
  const dispMonth = months[month];

  organisedData.push({
    x: dispMonth,
    y: data[month],
  })
});

// Build graph
const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      label: 'average temps',
      data: organisedData,
    }]
  },
});