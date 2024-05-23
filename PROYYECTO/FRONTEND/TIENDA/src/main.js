import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// comienza firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz8j27BiWiXOiKbJ6nCkWzvBOA1oVWhdU",
  authDomain: "programacionweb-8a2d7.firebaseapp.com",
  projectId: "programacionweb-8a2d7",
  storageBucket: "programacionweb-8a2d7.appspot.com",
  messagingSenderId: "759170300661",
  appId: "1:759170300661:web:2d6731bd4550fa66f323bc"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
