import type { FC, PropsWithChildren } from "react";

import AdSenseBanner from "@/components/google/adsense/AdSenseBanner/AdSenseBanner";

const RootTemplate: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<div>{children}</div>
			<div>
				<AdSenseBanner />
			</div>
		</div>
	);
};

export default RootTemplate;
