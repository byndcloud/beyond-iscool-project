import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'


const firebaseConfig = {
	apiKey: "AIzaSyCjZnRkugZ8G1kSCWzDjejOrRtX5QKgvXo",
	authDomain: "beyondschool-9e3c9.firebaseapp.com",
	databaseURL: "https://beyondschool-9e3c9.firebaseio.com",
	projectId: "beyondschool-9e3c9",
	storageBucket: "beyondschool-9e3c9.appspot.com",
	messagingSenderId: "639415364531",
	appId: "1:639415364531:web:d2781ff572e381bbddb9c6"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);


export default function setFirebase (Vue) {
	Object.defineProperty( Vue.prototype, '$firebase', {
		get () {
			return firebaseApp
		}
	})
}