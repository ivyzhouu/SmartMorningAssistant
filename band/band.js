var sleepStartTime;
var sleepEndTime;
var sleepDuration;

firebase.initializeApp({
  appName: "MorningAssistant",
  serviceAccount: "./service-account.json",
  authDomain: "morningassistant-77512.firebaseapp.com",
  databaseURL: "https://morningassistant-77512.firebaseio.com",
  storageBucket: "morningassistant-77512.appspot.com",
});

now = new Date;
dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
var ref = firebase.database().ref().child(dateKey).child('band');
ref.on('value', function(snapshot) {
  sleepStartTime = snapshot.val().sleep_start_time;
  sleepEndTime = snapshot.val().sleep_end_time;
  sleepDuration = snapshot.val().sleep_time/60;
  $(' .startTime').html(sleepStartTime + ' AM');
  $(' .endTime').html(sleepEndTime + ' AM');
  $(' .duration').html(sleepDuration.toPrecision(2) + ' hours');
});