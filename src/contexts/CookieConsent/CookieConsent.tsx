"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

import useCookieConsent from "./hooks/useCookieConsent";

interface ICookieConsentContext {
	consent: boolean;
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
	const consent = useCookieConsent();

	/*
	 * React element
	 */
	return (
		<CookieConsentContext.Provider value={{ consent }}>
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
