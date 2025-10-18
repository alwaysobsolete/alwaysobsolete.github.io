const env = {
	NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN as string,
	NEXT_PUBLIC_GA_TAG_ID: process.env.NEXT_PUBLIC_GA_TAG_ID as string,
	NEXT_PUBLIC_HTTP_PROTOCOL: process.env.NEXT_PUBLIC_HTTP_PROTOCOL as string,
	NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT as string,
	URL: `${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}${Number(process.env.NEXT_PUBLIC_PORT) === 80 || Number(process.env.NEXT_PUBLIC_PORT) === 443 ? "" : `:${process.env.NEXT_PUBLIC_PORT}`}`,
};

/*
 * Safety check
 */
// Only run safety check on server
const entries = Object.entries(env);

entries.forEach((entry) => {
	const key = entry[0];
	const value = entry[1];

	if (
		value === undefined &&
		(typeof window === undefined || key.match(/^NEXT_PUBLIC/))
	) {
		throw new Error(`Environment variable ${key} is undefined: ${value}`);
	}
});

export default env;
