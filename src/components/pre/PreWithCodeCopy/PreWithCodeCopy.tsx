"use client";

import type { FC, PropsWithChildren } from "react";
import { Button, CopyButton } from "@mantine/core";
import Check from "@material-symbols/svg-400/outlined/check.svg";
import ContentCopy from "@material-symbols/svg-400/outlined/content_copy.svg";
import { isValidElement } from "react";

import styles from "./styles.module.scss";

/**
 * Pre-formatted Code Block with Copy Button
 */
const PreWithCodeCopy: FC<PropsWithChildren> = ({ children }) => {
	/*
	 * React element
	 */
	// No <code> child, render as normal
	if (
		!(
			isValidElement(children) &&
			children.type === "code" &&
			children.props !== null &&
			typeof children.props === "object" &&
			"children" in children.props &&
			typeof children.props.children === "string"
		)
	) {
		return <pre>{children}</pre>;
	}

	// Has <code> child, add copy button
	return (
		<pre className={styles.wrapper}>
			<CopyButton value={children.props.children}>
				{({ copied, copy }) => (
					<Button
						className={styles.copyBtn}
						color={copied ? "teal" : "gray"}
						onClick={copy}
						title={copied ? "Copied" : "Copy to Clipboard"}
					>
						{copied ? (
							<Check height="1rem" width="1rem" />
						) : (
							<ContentCopy height="1rem" width="1rem" />
						)}
					</Button>
				)}
			</CopyButton>

			{children}
		</pre>
	);
};

export default PreWithCodeCopy;
