import React from 'react';
import Router from './RouterComponent';
import firebase from './firebase';

const messaging = firebase.messaging();

messaging.onMessage((payload)=>{
  alert(payload);
  console.log(payload);
  // appendMessage(payload); 
})


function App() {
  return (
    <>
        <Router />
    </>
  );
}

export default App;