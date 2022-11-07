const out = document.querySelector('#avg-temp')

let data = await fetch('/all-data')
data = await data.json()


let avg = 0


for (let i = 0; i < data.length; i++){
  avg += data[i].temp
}

avg = avg/data.length

out.textContent = avg.toString()
