import type { FC, PropsWithChildren } from "react";

import InfoLinksScript from "@/components/infolinks/InfoLinksScript/InfoLinksScript";

/**
 * RootTemplate
 */
const RootTemplate: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<div>{children}</div>
			<div>
				<InfoLinksScript />
			</div>
		</div>
	);
};

export default RootTemplate;
