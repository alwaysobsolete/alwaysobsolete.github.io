import type { FC } from "react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/github";
import "react-social-icons/itch.io";

import styles from "./styles.module.scss";

const FooterMenu: FC = () => {
	/*
	 * Constants
	 */
	const socialIconStyle = {
		height: "2rem",
		width: "2rem",
	};

	/*
	 * React element
	 */
	return (
		<nav className={styles.wrapper}>
			<div className={styles.branding}>
				<div className={styles.logo}>
					<Link href="/">/always/obsolete</Link>
				</div>
			</div>

			<div className={styles.sections}>
				<div className={styles.section}>
					<ul className={styles.icons}>
						<li>
							<SocialIcon
								style={socialIconStyle}
								url="https://alwaysobsolete.itch.io"
							/>
						</li>

						<li>
							<SocialIcon
								style={socialIconStyle}
								url="https://github.com/alwaysobsolete"
							/>
						</li>
					</ul>
				</div>

				<div className={styles.section}>
					<ul>
						<li>
							<Link href="/books">Books</Link>
						</li>
					</ul>
				</div>

				<div className={styles.section}>
					<ul>
						<li>
							<Link href="/about">About Us</Link>
						</li>
						<li>
							<Link href="/privacy">Privacy Policy</Link>
						</li>
						<li>
							<Link href="/cookie">Cookie Policy</Link>
						</li>
						<li>
							<Link href="/tos">Terms of Service</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default FooterMenu;
