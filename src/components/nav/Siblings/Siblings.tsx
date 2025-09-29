import type { FC } from "react";
import { Button } from "@mantine/core";
import KeyboardDoubleArrowLeft from "@material-symbols/svg-400/outlined/keyboard_double_arrow_left.svg";
import KeyboardDoubleArrowRight from "@material-symbols/svg-400/outlined/keyboard_double_arrow_right.svg";
import Link from "next/link";

import styles from "./styles.module.scss";

interface Sibling {
	title: string;
	url: string;
}

/**
 * Sibling Navigation
 */
const Siblings: FC<{ next?: Sibling; prev?: Sibling }> = ({ next, prev }) => {
	/*
	 * React element
	 */
	return (
		<nav className={styles.wrapper}>
			<Link href={prev?.url || "#"}>
				<Button
					disabled={!prev}
					leftSection={<KeyboardDoubleArrowLeft width={24} height={24} />}
					type="button"
					variant="outline"
				>
					{prev?.title || "End of Line"}
				</Button>
			</Link>

			<Link href={next?.url || "#"}>
				<Button
					disabled={!next}
					rightSection={<KeyboardDoubleArrowRight height={24} width={24} />}
					type="button"
					variant="outline"
				>
					{next?.title || "End of Line"}
				</Button>
			</Link>
		</nav>
	);
};

export default Siblings;
