import expireCookie from "./expireCookie";

function expireAllCookies() {
	if (typeof window !== "undefined" && document) {
		const cookieNames = document.cookie
			.split(";")
			.map((cookie) => cookie.split("=")[0]);

		cookieNames.forEach((cookieName) => expireCookie(cookieName));
	}
}

export default expireAllCookies;
