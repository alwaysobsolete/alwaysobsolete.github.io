"use client";

import type { GAParams } from "node_modules/@next/third-parties/dist/types/google";
import type { FC } from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

import { useCookieConsentContext } from "@/contexts/CookieConsent/CookieConsent";
import { useGPCContext } from "@/contexts/GPC";

const GoogleAnalytics: FC<GAParams> = ({
	gaId,
	dataLayerName,
	debugMode,
	nonce,
}) => {
	/*
	 * Context
	 */
	const { consent } = useCookieConsentContext();
	const { enabled: gpcEnabled } = useGPCContext();

	/*
	 * React element
	 */
	if (!consent || gpcEnabled) {
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
