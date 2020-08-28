import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'


const firebaseConfig = {
	apiKey: "AIzaSyDy3xPHZpBUv8OaZqO4iKLA8b2vRHpZsSA",
    authDomain: "bcschool2-4487c.firebaseapp.com",
    databaseURL: "https://bcschool2-4487c.firebaseio.com",
    projectId: "bcschool2-4487c",
    storageBucket: "bcschool2-4487c.appspot.com",
    messagingSenderId: "502849360532",
    appId: "1:502849360532:web:0a24cc450538c882f29a81"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()


export default function setFirebase (Vue) {
	Object.defineProperty( Vue.prototype, '$firebase', {
		get () {
			return firebaseApp
		}
	})
}