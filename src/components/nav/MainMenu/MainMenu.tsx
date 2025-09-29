"use client";

import type { FC } from "react";
import { Burger, Drawer, NavLink } from "@mantine/core";
import Book2 from "@material-symbols/svg-400/outlined/book_2.svg";
import Link from "next/link";
import { useState } from "react";

import styles from "./styles.module.scss";

const MainMenu: FC = () => {
	/*
	 * State
	 */
	const [opened, setOpened] = useState(false);

	/*
	 * Handlers
	 */
	function close() {
		setOpened(false);
	}

	/*
	 * React element
	 */
	return (
		<>
			<nav className={styles.wrapper}>
				<Link className={styles.logo} href="/">
					/always/obsolete
				</Link>

				<Burger
					aria-label="Toggle navigation"
					opened={opened}
					onClick={() => setOpened(!opened)}
				/>
			</nav>

			<Drawer onClose={close} opened={opened}>
				<div className={styles.drawerWrapper}>
					<NavLink
						component={Link}
						href="/books"
						label="Books"
						leftSection={<Book2 height="2rem" width="2rem" />}
						onClick={close}
					/>
				</div>
			</Drawer>
		</>
	);
};

export default MainMenu;
