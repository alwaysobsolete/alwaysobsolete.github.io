import type { FC } from "react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/itch.io";

import styles from "./styles.module.scss";

const FooterMenu: FC = () => {
	return (
		<nav className={styles.wrapper}>
			<div className={styles.branding}>
				<div className={styles.logo}>
					<Link href="/">/always/obsolete</Link>
				</div>

				<div className={styles.icons}>
					<SocialIcon
						style={{ height: "2rem", width: "2rem" }}
						url="https://alwaysobsolete.itch.io"
					/>
				</div>
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
