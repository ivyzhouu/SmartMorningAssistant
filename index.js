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
  try {
    var monthly_exercise_goal = snapshot.val().bike.monthly_active_calorie_goal;
    $(".exerciseGoal").text(monthly_exercise_goal + ' Calories');

    var today_active_calorie = snapshot.val().bike.today_active_calorie;
    if (today_active_calorie == undefined) {
      $(".activeEnergy").text('--.-- Calories');
    } else {
      $(".activeEnergy").text(today_active_calorie + ' Calories');
    }
    
    if (snapshot.val().curtain.avg_sleep_time == undefined) {
      $(".avgSleepTime").text('--.-- Hours');
  } else {
      var avg_sleep_time = (snapshot.val().curtain.avg_sleep_time / 60).toPrecision(2);
      $(".avgSleepTime").text(avg_sleep_time + ' Hours');
  }
  
    if (snapshot.val().curtain.avg_sleep_time == undefined) {
      $(".setTime").text('--:-- AM');
    } else {
      var set_time = snapshot.val().curtain.user_set_time;
      $(".setTime").text(set_time + ' AM');
    }
  } catch {

  }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});