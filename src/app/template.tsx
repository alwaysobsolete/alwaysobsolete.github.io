import type { FC, PropsWithChildren } from "react";

import CookieConsent from "@/components/document/CookieConsent/CookieConsent";

const RootTemplate: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<CookieConsent />
		</>
	);
};

export default RootTemplate;
