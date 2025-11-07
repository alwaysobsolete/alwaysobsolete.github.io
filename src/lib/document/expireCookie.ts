import env from "@/config/env";

function expireCookie(
	name: string,
	domain = env.NEXT_PUBLIC_DOMAIN,
	path = "/",
) {
	if (typeof window !== undefined && document) {
		const expires = "Thu, 01 Jan 1970 00:00:00 UTC";

		document.cookie = `${name}=; domain=${domain}; expires=${expires}; path=${path};`;
		document.cookie = `${name}=; domain=.${domain}; expires=${expires}; path=${path};`;
	}
}

export default expireCookie;
