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
			.catch((error) => {
				console.log("Error in Setting User", error);
				reject(err);
			});
	});
};

export const createAnonUser = (userUid) => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref("users/" + userUid)
			.set({
				userName: "Guest",
				email: null
			})
			.then(async (data) => {
				await setUser(userUid);
				currentUser.isAnonymous = true;
				resolve();
			})
			.catch((error) => {
				console.log("Error in creating Anon User", error);
				reject();
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
			.catch((error) => {
				console.log("Error in Logout", error);
				reject(false);
			});
	});
};

export const establishAuth = () => {
	return new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged(async (user) => {
			//There is a user logged in
			if (user) {
				if (user.isAnonymous) {
					try {
						await createAnonUser(user.uid);
						resolve();
					} catch {
						reject();
					}
				} else {
					try {
						await setUser(user.uid);
						currentUser.isAnonymous = false;
						resolve();
					} catch {
						reject();
					}
				}
			}
			//There is no user logged in
			else {
				currentUser = null;
				resolve();
			}
		});
	});
};

export const getUser = () => {
	return currentUser;
};
