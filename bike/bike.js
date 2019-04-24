var timer = new easytimer.Timer();
var duration;
var currentDuration;

$('.startButton').click(function () {
  // minutes
    timer.start({precision: 'seconds', startValues: {seconds: 0}, target: {seconds: 60}});
});
$('.pauseButton').click(function () {
    timer.pause();
});
$(' .stopButton').click(function () {
    var raw_duration = timer.getTimeValues()
    currentDuration = (raw_duration.seconds/60+ raw_duration.minutes + raw_duration.hours*60).toPrecision(2)
    saveExerciseDuration(currentDuration)
    timer.stop();
});
$(' .resetButton').click(function () {
    timer.reset();
});
timer.addEventListener('secondsUpdated', function (e) {
    $(' .values').html(timer.getTimeValues().toString());
    $(' .progress_bar').html($(' .progress_bar').html() + '-');
});
timer.addEventListener('started', function (e) {
    $(' .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('reset', function (e) {
    $(' .values').html(timer.getTimeValues().toString());
    $(' .progress_bar').html('');
});
timer.addEventListener('targetAchieved', function (e) {
  $(' .progress_bar').html('COMPLETE!!!');
});

saveExerciseDuration = function(currentDuration){
  // config
  firebase.initializeApp({
    appName: "MorningAssistant",
    serviceAccount: "./service-account.json",
    authDomain: "morningassistant-77512.firebaseapp.com",
    databaseURL: "https://morningassistant-77512.firebaseio.com",
    storageBucket: "morningassistant-77512.appspot.com",
  });
  // key
  now = new Date;
  dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
  
  var ref = firebase.database().ref().child(dateKey);
  var bikeRef = ref.child('bike');

  // bikeRef.on('value', function(snapshot) {
  //   duration = snapshot.val().exercise_duration
  //   console.log(duration)
  //   console.log(currentDuration)

    // if (duration !== undefined){
    //   duration = currentDuration + duration
    //   bikeRef.update({exercise_duration: duration}) 
    // } else {
      duration = currentDuration
      // create child bike
      bike = {  exercise_duration: duration,
                monthly_active_calorie_goal: '550',
                today_active_calorie: (1.2 * duration).toPrecision(2),
      }
      bikeRef.update(bike)  
    // }
  // })
}