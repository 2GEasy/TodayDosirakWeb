importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js'); // eslint-disable-line
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js'); // eslint-disable-line

firebase.initializeApp({
  apiKey: "AIzaSyA4G_HNM9WzQaZN0q8xAGBZ-56kIipBpg8",
    authDomain: "todaydsr-d09b7.firebaseapp.com",
    databaseURL: "https://todaydsr-d09b7.firebaseio.com",
    projectId: "todaydsr-d09b7",
    storageBucket: "todaydsr-d09b7.appspot.com",
    messagingSenderId: "102307791174",
    appId: "1:102307791174:web:528005e02ae55cfb272547",
    measurementId: "G-63F4YTXVN6"
}); 

const initMessaging=firebase.messaging();
var push_url;

// initMessaging.usePublicVapidKey('BLO0QV4kt5DFNOZURx4oXFqtMsdRHpvcFoCLdJkLG6lcd0_KItfVEDRo1OwhE0lUH3Ihf1q3VlrXlWHumvK_79w');
initMessaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.',
    };
    
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
      clients.openWindow(event.action);
  }
  event.notification.close();
}); 




