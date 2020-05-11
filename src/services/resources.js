import firebase from "firebase/app";
import firedata from "firebase/database";
import auth from "./auth";

let currentSessions = null;

// export const getSessions = () => {
// 	console.log("getting sessions", currentSessions);
// 	if (currentSessions) {
// 		return currentSessions;
// 	} else {
// 		return [];
// 	}
// };

// export const callForSessionsbyUser = (userUid) => {
// 	return new Promise((resolve, reject) => {
// 		const dbRef = firebase
// 			.database()
// 			.ref("sessions")
// 			.orderByChild("user")
// 			.equalTo(userUid);

// 		dbRef.on(
// 			"value",
// 			(snap) => {
// 				const values = snap.val();
// 				for (const property in values) {
// 					values[property].id = property;
// 				}
// 				currentSessions = Object.values(values);
// 				resolve();
// 			},
// 			function (errorObject) {
// 				console.log("The read failed: " + errorObject.code);
// 			}
// 		);
// 	});
// };

// export const addSessionWithUser = (session) => {
// 	let user = auth.getUser();
// 	session.createdBy = user.uid;
// 	console.log(session);
// };

// this.$http
// 	.get("sessions.json?orderBy="user"&equalTo="")
// 	.then(
// 		(response) => {
// 			return response.json();
// 		},
// 		(error) => {
// 			console.log(error);
// 		}
// 	)
// .then((data) => {
// 	let dataArray = [];
// 	for (let key in data) {
// 		const session = data[key];
// 		session.id = key;
// 		dataArray.push(session);
// 	}
// 	this.sessions = dataArray;
// });
