import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from './firebase';

const messaging = firebase.messaging();

// messaging.onMessage(async remoteMessage => {
//   alert(remoteMessage.data.title,remoteMessage.data.message);
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// serviceWorker.register();
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//   .then(function(registration) {
//     console.log('Registration successful, scope is:', registration.scope);
//   }).catch(function(err) {
//     console.log('Service worker registration failed, error:', err);
//   });
// }


if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
      const registration = await navigator.serviceWorker.register('../firebase-messaging-sw.js', {
          updateViaCache: 'none'
      });
      console.log("Registraion Success:",registration.scope);
      messaging.useServiceWorker(registration);
      messaging.onMessage((payload) => {
          console.log("Foreground Message:",payload);
          const title = payload.notification.title;
          const options = {
            body:payload.notification.body,
            data:{url:payload.data.url},
            actions:[{action:payload.notification.click_action,title:"지금 확인"}]
          };
          registration.showNotification(title,options);           
      });
  });
}