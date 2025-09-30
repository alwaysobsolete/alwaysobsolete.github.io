const env = {
	DOMAIN: process.env.DOMAIN || "alwaysobsolete.github.io",
	HTTP_PROTOCOL: process.env.HTTP_PROTOCOL || "https",
	URL: "",
};

env.URL = `${env.HTTP_PROTOCOL}://${env.DOMAIN}`;

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
