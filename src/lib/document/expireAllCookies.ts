"use client";

import expireCookie from "./expireCookie";

function expireAllCookies() {
	const cookieNames = document.cookie
		.split(";")
		.map((cookie) => cookie.split("=")[0]);

	cookieNames.forEach((cookieName) => expireCookie(cookieName));
}

export default expireAllCookies;
