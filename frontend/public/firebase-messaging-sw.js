// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here, other Firebase libraries
// // are not available in the service worker.
// importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");
// // importScripts('/__/firebase/init.js');

// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//   messagingSenderId:
//     "BMr8HeGWqSE5-X4CCg50qngyBZAZDfHtJcXb-564F9cXKrhJxBqsdqEE-laPLfOqu5IgVcSTn4fZXUDq3qgGQxg",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// firebase.messaging();
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBUo8b-FaWsc8ugPSyhnXWIVff5eTbiG7E",
  authDomain: "clubhive-d74f9.firebaseapp.com",
  projectId: "clubhive-d74f9",
  storageBucket: "clubhive-d74f9.appspot.com",
  messagingSenderId: "450655771134",
  appId: "1:450655771134:web:acb2973c80af47a36888af",
  measurementId: "G-3HTY62GLR5",
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
