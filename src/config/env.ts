const { NEXT_PUBLIC_DOMAIN, NEXT_PUBLIC_HTTP_PROTOCOL, NEXT_PUBLIC_PORT } =
	process.env;

const env = {
	NEXT_PUBLIC_DOMAIN,
	NEXT_PUBLIC_HTTP_PROTOCOL,
	NEXT_PUBLIC_PORT,
	URL: `${NEXT_PUBLIC_HTTP_PROTOCOL}://${NEXT_PUBLIC_DOMAIN}${Number(NEXT_PUBLIC_PORT) === 80 || Number(NEXT_PUBLIC_PORT) === 443 ? "" : `:${NEXT_PUBLIC_PORT}`}`,
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
