import firebase from "firebase";
let currentUser = {};

export const setUser = (userUid) => {
	const ref = firebase
		.database()
		.ref("users/" + userUid)
		.once("value")
		.then((snapshot) => {
			currentUser = snapshot.val();
			localStorage.setItem("user", JSON.stringify(currentUser));
		});
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
