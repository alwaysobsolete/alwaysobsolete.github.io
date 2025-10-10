import type { FC, ReactNode } from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

/**
 * Make Breadcrumbs Separator
 */
function makeSeparator(key: string | number) {
	return (
		<div
			className="m_3b8f2208 mantine-Breadcrumbs-separator"
			key={`separator-${key}`}
		>
			/
		</div>
	);
}

/**
 * Breadcrumbs component
 */
const Breadcrumbs: FC<{
	crumbs: { title: number | string; href?: string }[];
}> = ({ crumbs }) => {
	// Convert crumbs to array of crumbs and separators
	const loaf = crumbs.reduce<ReactNode[]>((acc, crumb, idx, array) => {
		// Push crumb
		acc.push(
			crumb.href ? (
				<Link
					className="m_f678d540 mantine-Breadcrumbs-breadcrumb"
					href={crumb.href}
					key={idx}
				>
					{crumb.title}
				</Link>
			) : (
				crumb.title
			),
		);

		// Push separator
		if (idx !== array.length - 1) {
			acc.push(makeSeparator(idx));
		}

		return acc;
	}, []);

	/*
	 * React element
	 */
	return (
		<div className={`${styles.wrapper} m_8b3717df mantine-Breadcrumbs-root`}>
			{makeSeparator("opening")}
			{loaf}
			{makeSeparator("closing")}
		</div>
	);
};

export default Breadcrumbs;
