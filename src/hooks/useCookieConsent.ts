import { useSyncExternalStore } from "react";

import getCookie from "@/lib/document/getCookie";

/*
 * Constants
 */
const cookieConsentName = "cookie_consent";

/**
 * useCookieConsent
 */
function useCookieConsent() {
	return useSyncExternalStore<boolean>(
		/**
		 * Subscribe
		 */
		() => () => {},
		/**
		 * Get Snapshot
		 */
		() => {
			let consent = false;

			if (typeof window !== "undefined" && document) {
				const cookie = getCookie(cookieConsentName);

				if (cookie) {
					try {
						consent = JSON.parse(cookie) === true;
					} catch {
						throw new Error(`Could not parse cookie: ${cookieConsentName}`);
					}
				}
			}

			return consent;
		},
		/**
		 * Get Server Snapshot
		 */
		() => false,
	);
}

export { cookieConsentName };
export default useCookieConsent;
