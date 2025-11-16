"use client";

import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface ICookieConsentContext {
	consent: boolean;
	setConsent: Dispatch<SetStateAction<boolean>>;
}

const CookieConsentContext = createContext<ICookieConsentContext | undefined>(
	undefined,
);

/**
 * CookieConsent Context Provider
 */
const CookieConsentProvider: FC<PropsWithChildren> = ({ children }) => {
	/*
	 * Context
	 */
	const [consent, setConsent] = useState<boolean>(true);

	/*
	 * React element
	 */
	return (
		<CookieConsentContext.Provider value={{ consent, setConsent }}>
			{children}
		</CookieConsentContext.Provider>
	);
};

/**
 * useCookieConsentContext
 *
 * React hook to get CookieConsentContext or throw error
 * if parent component has no CookieConsetntContextProvider
 */
function useCookieConsentContext() {
	const cookieConsentContext = useContext(CookieConsentContext);

	if (cookieConsentContext === undefined) {
		throw new Error(
			"useCookieConsentContext must be called from within a CookieConsentProvider",
		);
	}

	return cookieConsentContext;
}

export { CookieConsentProvider, useCookieConsentContext };
