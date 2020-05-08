let currentUser;

export const setUser = (user) => {
	currentUser = user.displayName;
	localStorage.setItem("user", user.displayName);
};

const checkStorageForUser = () => {
	if (!currentUser) {
		return localStorage.getItem("user");
	}
	return currentUser;
};

export const getDisplayName = () => {
	let user = checkStorageForUser();
	if (user) {
		return user;
	} else {
		return "";
	}
};
