var set_time;

new GijgoTimePicker(document.getElementById('timepicker'), {
  change: function (e) {
    set_time = $('#timepicker')[0].value
    alert('set successfully');
    saveSetTime()
    }
  });

saveSetTime = function(){
  // config
  firebase.initializeApp({
    appName: "MorningAssistant",
    serviceAccount: "./service-account.json",
    authDomain: "morningassistant-77512.firebaseapp.com",
    databaseURL: "https://morningassistant-77512.firebaseio.com",
    storageBucket: "morningassistant-77512.appspot.com",
  });
  
  // get date and converted it into format "yyyymmdd" for later use
  // set alarm for tomorrow, so date+1
  now = new Date;
  dateKey = now.getFullYear() + '0' + (now.getMonth()+1) + (now.getDate()+1);
  console.log(dateKey)
  // create the new key 
  var ref = firebase.database().ref().child(dateKey);
  var curtainsRef = ref.child('curtain');
  // weekend:true, weekday:false
  var isWeekend = ([0,6].indexOf(new Date().getDay()) != -1);

  curtain = { is_weekend: isWeekend,
              avg_sleep_time: '530.71',   // should generate from the sleep time of past 5 weekdays.
              user_set_time: set_time,
            }
  curtainsRef.update(curtain)  
}
