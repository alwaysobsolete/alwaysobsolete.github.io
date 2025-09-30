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

const description =
	"A blog about vintage, retro, and fantasy video game consoles";
const title = "/always/obsolete";

const metadata: Metadata = {
	description,
	metadataBase: new URL("http://alwaysobsolete.github.io"),
	title,
	openGraph: {
		description,
		title,
		images: { url: "/tina-rataj-berard-0Q33pyk-AXI-unsplash.jpg" },
	},
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
