var firebase = require('firebase');
var json = require('./raw.json');

// config
firebase.initializeApp({
  appName: "MorningAssistant",
  serviceAccount: "./service-account.json",
  authDomain: "morningassistant-77512.firebaseapp.com",
  databaseURL: "https://morningassistant-77512.firebaseio.com",
  storageBucket: "morningassistant-77512.appspot.com",
});

for (let i=0; i<31; i++){
  var ref = firebase.database().ref().child(json[i].date);
  // band data
  var bandsRef = ref.child('band');
  band = {  sleep_end_time: json[i].sleep_end_time,
            sleep_start_time: json[i].sleep_start_time,
            sleep_time: json[i].sleep_time,
        }
  bandsRef.set(band)
  // bike data
  var bikesRef = ref.child('bike');
  bike = {  today_active_calorie: json[i].today_active_calorie,
            monthly_active_calorie_goal: json[i].monthly_active_calorie_goal,
            exercise_duration: json[i].exercise_duration,
        }
  bikesRef.set(bike)
  // curtain data
  var curtainsRef = ref.child('curtain');
  curtain = { is_weekend: json[i].is_weekend,
              is_sunny: json[i].is_sunny,
              use_light: json[i].use_light,
              avg_sleep_time: json[i].avg_sleep_time,
              user_set_time: json[i].user_set_time,
              // curtain_width: json[i].curtain_width,
              // light : json[i].light
            }
  curtainsRef.set(curtain)
}