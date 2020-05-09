import firebase from "firebase";
let currentUser = {};

export const setUser = (userUid) => {
	const ref = firebase.database().ref("users/" + userUid);
	ref.on(
		"value",
		(snapshot) => {
			currentUser = snapshot.val();
			localStorage.setItem("user", JSON.stringify(currentUser));
		},
		(errorObject) => {
			console.log("The read failed: " + errorObject.code);
		}
	);
};

const assignUserFromStorage = () => {
	if (!currentUser.email) {
		const userInfo = localStorage.getItem("user");
		return JSON.parse(userInfo);
	} else {
		return currentUser;
	}
};

export const getUser = () => {
	if (!currentUser.email) {
		const user = assignUserFromStorage();
		return user;
	} else {
		return currentUser;
	}
};
