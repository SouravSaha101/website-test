import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    // Populate your firebase configuration data here.
    apiKey: "AIzaSyAolznUMElr0MtjrAPSKOeFXNMAu9tnkZk",
    authDomain: "website-test-2a08e.firebaseapp.com",
    projectId: "website-test-2a08e",
    storageBucket: "website-test-2a08e.appspot.com",
    messagingSenderId: "523031707719",
    appId: "1:523031707719:web:9729d8b18f0e1b130d3162",
    measurementId: "G-MF4T4E8N0T"
});

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db,firebaseApp };
