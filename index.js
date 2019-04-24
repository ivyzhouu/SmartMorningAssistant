firebase.initializeApp({
  appName: "MorningAssistant",
  serviceAccount: "./service-account.json",
  authDomain: "morningassistant-77512.firebaseapp.com",
  databaseURL: "https://morningassistant-77512.firebaseio.com",
  storageBucket: "morningassistant-77512.appspot.com",
});

now = new Date;
dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
var ref = firebase.database().ref().child(dateKey);
ref.on("value", function(snapshot) {
  var today_active_calorie = snapshot.val().bike.today_active_calorie;
  var avg_sleep_time = (snapshot.val().curtain.avg_sleep_time / 60).toPrecision(2);
  var set_time = snapshot.val().curtain.user_set_time;
  $(".activeEnergy").text(today_active_calorie + ' Calories');
  $(".avgSleepTime").text(avg_sleep_time + ' Hours');
  $(".setTime").text(set_time + ' AM');
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});