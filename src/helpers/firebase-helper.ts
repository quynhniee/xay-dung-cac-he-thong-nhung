import { getDatabase } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {useEffect} from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAM3CWr-Ach1f1xGL4Re79tODG6TkaKXrY",
    authDomain: "dht11-mq2.firebaseapp.com",
    databaseURL: "https://dht11-mq2-default-rtdb.firebaseio.com",
    projectId: "dht11-mq2",
    storageBucket: "dht11-mq2.appspot.com",
    messagingSenderId: "169801046193",
    appId: "1:169801046193:web:65bd048b50aa55c3be2a90",
    measurementId: "G-L225DSMBPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

export default database;