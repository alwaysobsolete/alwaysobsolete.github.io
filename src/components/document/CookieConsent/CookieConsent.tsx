"use client";

import type { FC } from "react";
import { Button, Drawer } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

import { useCookieConsentContext } from "@/contexts/CookieConsent/CookieConsent";
import { cookieConsentName } from "@/hooks/useCookieConsent";
import expireAllCookies from "@/lib/document/expireAllCookies";
import setCookie from "@/lib/document/setCookie";

import styles from "./styles.module.scss";

const CookieConsent: FC = () => {
	/*
	 * Context
	 */
	const { consent } = useCookieConsentContext();

	/*
	 * State
	 */
	const [opened, setOpened] = useState<boolean>(!consent);

	/*
	 * Handlers
	 */
	function onAccept() {
		setCookie(cookieConsentName, "true", {
			expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			path: "/",
		});

		setOpened(false);
	}

	function onReject() {
		expireAllCookies();
		setOpened(false);
	}

	/*
	 * React element
	 */
	return (
		<Drawer
			className={styles.wrapper}
			closeOnClickOutside={false}
			closeOnEscape={false}
			lockScroll={false}
			onClose={() => setOpened(false)}
			opened={!consent && opened}
			padding="xs"
			position="bottom"
			size="6rem"
			withCloseButton={false}
			withOverlay={false}
		>
			<p>
				This site uses cookies: <Link href="/cookie">Cookie Policy</Link>
			</p>

			<div className="flex">
				<Button color="teal" onClick={onAccept} size="compact-sm">
					Accept
				</Button>

				<Button
					color="red"
					onClick={onReject}
					size="compact-sm"
					variant="outline"
				>
					Reject
				</Button>
			</div>
		</Drawer>
	);
};

export default CookieConsent;
