"use client";

import type { FC } from "react";
import Script from "next/script";

import env from "@/config/env";

function gtag(...args: unknown[]) {
	window.dataLayer?.push(...args);
}

const GoogleAnalytics: FC = () => {
	return (
		<>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_TAG_ID}`}
				onReady={() => {
					if (typeof window !== undefined) {
						window.dataLayer = window.dataLayer || [];
						gtag("js", new Date());
						gtag("config", env.NEXT_PUBLIC_GA_TAG_ID);
					}
				}}
			/>
		</>
	);
};

export default GoogleAnalytics;
