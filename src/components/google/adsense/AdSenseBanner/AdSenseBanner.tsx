"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const AdUnit: ReactNode = (
	<>
		<script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5660510804306439"
			crossOrigin="anonymous"
		/>

		<ins
			className="adsbygoogle"
			style={{ display: "block" }}
			data-ad-client="ca-pub-5660510804306439"
			data-ad-slot="7342703004"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	</>
);

const AdSenseBanner: FC = () => {
	/*
	 * Context
	 */
	const ref = useRef<HTMLDivElement>(null);

	/*
	 * State
	 */
	const [children, setChildren] = useState<ReactNode>(null);

	/*
	 * Effects
	 */
	// Load AdSense Ad
	useEffect(() => {
		if (typeof window !== "undefined" && ref.current) {
			setChildren(AdUnit);
			window.adsbygoogle = window.adsbygoogle || [];
			window.adsbygoogle.push({});
		}
	}, []);

	/*
	 * React element
	 */
	return <div ref={ref}>{children}</div>;
};

export default AdSenseBanner;
