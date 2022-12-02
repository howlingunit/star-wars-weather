const out = document.querySelector('#avg-temp');

let data = await fetch('/months-avg');
data = await data.json();

const ctx = document.getElementById('myChart');

const organisedData = []

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
}

Object.keys(data).sort().forEach((month) => {
  const dispMonth = months[month];

  organisedData.push({
    x: dispMonth,
    y: data[month],
  })
})


new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      label: 'average temps',
      data: organisedData,
    }]
  },
});