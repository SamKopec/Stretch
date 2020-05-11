import firebase from "firebase/app";
import fireauth from "firebase/auth";
import firedata from "firebase/database";
let currentUser = null;

export const setUser = (userUid) => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref("users/" + userUid)
			.once("value")
			.then((snapshot) => {
				currentUser = snapshot.val();
				currentUser.uid = userUid;
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const logout = () => {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				resolve(true);
			})
			.catch(function (error) {
				reject(false);
			});
	});
};

export const establishAuth = () => {
	return new Promise((resolve, reject) => {
		console.log(firebase.auth().currentUser);

		firebase.auth().onAuthStateChanged(async (user) => {
			//There is a user logged in
			console.log("auth state change");
			if (user) {
				try {
					await setUser(user.uid);
					resolve();
				} catch (error) {
					reject();
				}
			}
			//There is no user logged in
			else {
				currentUser = null;
				//logic for reroute to login page
				resolve();
			}
		});
	});
};

export const getUser = () => {
	return currentUser;
};
