importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js'); // eslint-disable-line
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js'); // eslint-disable-line

firebase.initializeApp({messagingSenderId: "102307791174"}); 

const initMessaging=firebase.messaging();

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