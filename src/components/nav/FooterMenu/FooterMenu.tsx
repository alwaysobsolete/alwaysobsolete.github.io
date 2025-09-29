import type { FC } from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

const FooterMenu: FC = () => {
	return (
		<nav className={styles.wrapper}>
			<div className={styles.brand}>
				<Link href="/">/always/obsolete</Link>
			</div>
		</nav>
	);
};

export default FooterMenu;
