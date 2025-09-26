import type { FC } from "react";
import { Breadcrumbs as MantineBreadcrumbs } from "@mantine/core";
import Link from "next/link";

const Breadcrumbs: FC<{
	crumbs: { title: number | string; href?: string }[];
}> = ({ crumbs }) => {
	/*
	 * React element
	 */
	return (
		<MantineBreadcrumbs separatorMargin="md">
			{crumbs.map((crumb, idx) =>
				crumb.href ? (
					<Link href={crumb.href} key={idx}>
						{crumb.title}
					</Link>
				) : (
					crumb.title
				),
			)}
		</MantineBreadcrumbs>
	);
};

export default Breadcrumbs;
