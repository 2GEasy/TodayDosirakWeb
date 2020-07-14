import * as firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyA4G_HNM9WzQaZN0q8xAGBZ-56kIipBpg8",
    authDomain: "todaydsr-d09b7.firebaseapp.com",
    databaseURL: "https://todaydsr-d09b7.firebaseio.com",
    projectId: "todaydsr-d09b7",
    storageBucket: "todaydsr-d09b7.appspot.com",
    messagingSenderId: "102307791174",
    appId: "1:102307791174:web:528005e02ae55cfb272547",
    measurementId: "G-63F4YTXVN6"
};
firebase.initializeApp(config);

export default firebase;
