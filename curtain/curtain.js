var useLight;
var isSunny;

firebase.initializeApp({
  appName: "MorningAssistant",
  serviceAccount: "./service-account.json",
  authDomain: "morningassistant-77512.firebaseapp.com",
  databaseURL: "https://morningassistant-77512.firebaseio.com",
  storageBucket: "morningassistant-77512.appspot.com",
});

var light = $("#lightslider")
            .slider()
            .on("slide", function(slideEvt) {
              lightness = slideEvt.currentTarget.value;
              setLight(lightness);
              $("#lightness").text(lightness + '%');
            });

var curtain = $("#curtainslider").slider()
              .on("slide", function(slideEvt) {
                width = slideEvt.currentTarget.value;
                setCurtain(width);
	              $("#curtainWidth").text(width + '%');
              });

toggleOnOff = function(useLight) {
  $('#toggle').prop('checked', useLight).change()
}

$('#toggle').change(function() {
  useLight = $(this).prop('checked')
  turnLightOn(useLight, isSunny)
})

getWeather = function(){
  var request = new XMLHttpRequest();
  var appId = '20613cc2f6dbf500eabfab00f2530549'
  request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=90007,us&appid=' + appId, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    
    if (request.status >= 200 && request.status < 400) {
      
      var currentWeather = data.weather[0].main;
      console.log('current weather:', currentWeather)
    
      if (currentWeather ==! 'Clear'){
        useLight = true;
        isSunny = false;
      }
      else {
        useLight = false;
        isSunny = true;
      }

      toggleOnOff(useLight)
      turnLightOn(useLight, isSunny)

    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Oh, OpenWeather API is not working!`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

turnLightOn = function(useLight, isSunny){
  now = new Date;
  dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
  var ref = firebase.database().ref().child(dateKey);
  var curtainsRef = ref.child('curtain');
  curtain = { use_light: useLight,
              is_sunny: isSunny,
            }
  curtainsRef.update(curtain)  
}

setLight = function(lightness){
  now = new Date;
  dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
  var ref = firebase.database().ref().child(dateKey);
  var curtainsRef = ref.child('curtain');
  lightPercent = { light: lightness/100 }
  curtainsRef.update(lightPercent)
}

setCurtain = function(width){
  now = new Date;
  dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
  var ref = firebase.database().ref().child(dateKey);
  var curtainsRef = ref.child('curtain');
  curtainPercent = { curtain_width: width/100 }
  curtainsRef.update(curtainPercent)
}

getWeather();

