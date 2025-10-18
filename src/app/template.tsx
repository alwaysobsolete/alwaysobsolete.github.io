import type { FC, PropsWithChildren } from "react";

import GoogleAnalytics from "@/components/google/analytics/GoogleAnalytics";

const RootTemplate: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<GoogleAnalytics />
		</>
	);
};

export default RootTemplate;
