import React, { useEffect } from 'react';
import Router from './RouterComponent';
import firebase from './firebase';
import { Alert } from '@material-ui/lab';


// messaging.onMessage(async (payload)=>{
  //   alert(payload.data.title,payload.data.message);
  //   console.log(payload);
  //   // appendMessage(payload); 
  // })
  // messaging.onMessage((payload) => {
    //   const title = payload.notification.title;
    //   const options = {
      //       body: payload.notification.body,
      //       actions: [
        //           {
          //               action: payload.fcmOptions.link,
          //               title: 'Book Appointment'
          //           }
          //       ]
          //   };
          //   showNotification(title, options);           
          // });
          
function App() { 
  return (
    <>
        <Router />
    </>
  );
}

export default App;