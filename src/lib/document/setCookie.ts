import env from "@/config/env";

interface CookieOptions {
	domain?: string;
	expires?: Date;
	maxAge?: number;
	partitioned?: boolean;
	path?: string;
	samesite?: "lax" | "strict" | "none";
	secure?: boolean;
}

function setCookie(
	name: string,
	value: string,
	options: CookieOptions = {
		domain: env.NEXT_PUBLIC_DOMAIN,
		path: "/",
	},
) {
	let str = `${name}=${value};`;

	Object.entries(options).forEach(
		([k, v]) => (str = str.concat(` ${k}=${v};`)),
	);

	document.cookie = str;
}

export default setCookie;
