import type { FC } from "react";
import Script from "next/script";

const InfoLinksScript: FC = () => {
	/*
	 * React element
	 */
	return (
		<div>
			<Script
				type="text/javascript"
				src="//resources.infolinks.com/js/infolinks_main.js"
			></Script>
			<Script id="infolinks" type="text/javascript">
				var infolinks_pid = 3440745; var infolinks_wsid = 0;
			</Script>
		</div>
	);
};

export default InfoLinksScript;
