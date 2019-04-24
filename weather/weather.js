var weather;

var img = document.getElementById('img');
function changeImage(weatherIcon){
  img.src = '../img/' + weatherIcon +'.png';
  console.log(img.src)
}

const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=90007,us&appid=20613cc2f6dbf500eabfab00f2530549', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {

    const h4 = document.createElement('h4');
    weather = data.weather[0].main;
    h4.textContent = weather;
    console.log(weather);
    
    if (weather == 'Clear'){
      weatherIcon = 'sunny'
      changeImage(weatherIcon)
    } else if (weather == 'Cloudy' || 'Fog' || 'Mist'){
      weatherIcon = 'cloudy'
      changeImage(weatherIcon)
    } else {
      weatherIcon = 'else'
      changeImage(weatherIcon)
    }

    const location = document.createElement('p');
    location.textContent = data.name;

    const h1 = document.createElement('h1');
    h1.textContent = (data.main.temp-273.15).toFixed(2) + '°C';

    container.appendChild(h4);
    container.appendChild(location);
    container.appendChild(h1);

  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Oh, OpenWeather API is not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();