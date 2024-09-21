// Import Firebase scripts needed for messaging in service workers
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyAw9QWG9eoWB_TtONDVdOszhMD7tX7S1gM",
  authDomain: "utopia-63ebc.firebaseapp.com",
  databaseURL: "https://utopia-63ebc-default-rtdb.firebaseio.com",
  projectId: "utopia-63ebc",
  storageBucket: "utopia-63ebc.appspot.com",
  messagingSenderId: "796421589574",
  appId: "1:796421589574:web:7fe92d1d4f5e0727ff1847",
  measurementId: "G-4ZB0Y0E15J",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

// Handler for background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // You can set a custom icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
