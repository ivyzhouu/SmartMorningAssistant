var firebase = require('firebase');
// config
firebase.initializeApp({
  appName: "MorningAssistant",
  serviceAccount: "./service-account.json",
  authDomain: "morningassistant-77512.firebaseapp.com",
  databaseURL: "https://morningassistant-77512.firebaseio.com",
  storageBucket: "morningassistant-77512.appspot.com",
});

// get data
// var ref = firebase.app().database().ref();
// ref.once('value')
//   .then(function (snap) {
//     console.log(snap.val());
//  })

// save data
var ref = firebase.database().ref().child('190301');
var bandsRef = ref.child('band');
bandsRef.set(band)
var bikesRef = ref.child('bike');
var curtainsRef = ref.child('curtain');

// // Create a new ref and log it’s push key
// var userRef = usersRef.push();
// console.log(‘user key’, userRef.key);
// // Create a new ref and save data to it in one step
// var userRef = usersRef.push({
//  name: ‘Christopher’,
//  description: ‘I eat too much ice cream’
// });