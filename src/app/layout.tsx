import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";

import FooterMenu from "@/components/nav/FooterMenu/FooterMenu";
import MainMenu from "@/components/nav/MainMenu/MainMenu";

import "@mantine/core/styles.css";
import "@/styles/globals.scss";

const metadata: Metadata = {
	title: "/always/obsolete",
	description: "A blog about vintage, retro, and fantasy consoles.",
};

/**
 * Root Layout Component
 */
const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>

			<body>
				<MantineProvider defaultColorScheme="dark">
					<header>
						<MainMenu />
					</header>

					<main>{children}</main>

					<footer>
						<FooterMenu />
						<div className="copyright">Copyright © /always/obsolete 2025</div>
					</footer>
				</MantineProvider>
			</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
