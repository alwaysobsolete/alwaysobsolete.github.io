import type { FC } from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

const FooterMenu: FC = () => {
	return (
		<nav className={styles.wrapper}>
			<div className={styles.branding}>
				<span className={styles.logo}>
					<Link href="/">/always/obsolete</Link>
				</span>
			</div>

			<div className={styles.section}>
				<ul>
					<li>
						<Link href="/books">Books</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default FooterMenu;
