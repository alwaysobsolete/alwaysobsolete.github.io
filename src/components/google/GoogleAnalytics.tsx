"use client";

import type { GAParams } from "node_modules/@next/third-parties/dist/types/google";
import type { FC } from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

import useCookieConsent from "@/hooks/useCookieConsent";

const GoogleAnalytics: FC<GAParams> = ({
	gaId,
	dataLayerName,
	debugMode,
	nonce,
}) => {
	/*
	 * Context
	 */
	const consent = useCookieConsent();

	/*
	 * React element
	 */
	if (!consent || !!navigator.globalPrivacyControl) {
		return;
	} else {
		return (
			<NextGoogleAnalytics
				gaId={gaId}
				dataLayerName={dataLayerName}
				debugMode={debugMode}
				nonce={nonce}
			/>
		);
	}
};

export default GoogleAnalytics;
