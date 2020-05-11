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
				console.log("snap", snapshot.val());
				currentUser = snapshot.val();
				currentUser.uid = userUid;
				resolve();
			})
			.catch((err) => {
				console.log(err);
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
				resolve();
			})
			.catch((error) => {
				console.log("Erroring here?");
				console.log(error);
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
			.catch(function (error) {
				reject(false);
			});
	});
};

export const establishAuth = () => {
	console.log("establishAuth");
	return new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged(async (user) => {
			//There is a user logged in
			if (user) {
				console.log("is anon?", user.isAnonymous);
				console.log("is anon?", user.uid);
				if (user.isAnonymous) {
					try {
						await createAnonUser(user.uid);
						resolve();
					} catch (error) {
						reject();
					}
				} else {
					try {
						await setUser(user.uid);
						resolve();
					} catch (error) {
						reject();
					}
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
