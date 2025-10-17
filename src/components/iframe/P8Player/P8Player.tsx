"use client";

import type { DetailedHTMLProps, FC, IframeHTMLAttributes } from "react";
import { Collapse } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

import PreWithCodeCopy from "@/components/pre/PreWithCodeCopy/PreWithCodeCopy";

import "highlight.js/scss/base16/solarized-dark.scss";
import styles from "./styles.module.scss";

const P8SfxVideo: FC<
	DetailedHTMLProps<IframeHTMLAttributes<HTMLElement>, HTMLElement> & {
		cart?: string;
		code?: string;
		marginBottom?: string | number | true;
		marginTop?: string | number | true;
	}
> = ({
	allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
	allowFullScreen = true,
	cart,
	code,
	frameBorder = 0,
	height,
	loading = "lazy",
	marginBottom,
	marginTop,
	name,
	referrerPolicy,
	sandbox,
	seamless,
	src,
	srcDoc,
	width,
}) => {
	/*
	 * Constants
	 */
	const cartName = cart?.match(/[^\/]+$/)?.[0];

	/*
	 * State
	 */
	const [prePreOpened, setPreOpened] = useState(false);

	/*
	 * React element
	 */
	return (
		<div
			className={styles.wrapper}
			style={{
				marginBottom: marginBottom === true ? "6rem" : marginBottom,
				marginTop: marginTop === true ? "6rem" : marginTop,
			}}
		>
			<iframe
				allow={allow}
				allowFullScreen={allowFullScreen}
				frameBorder={frameBorder}
				height={height}
				loading={loading}
				name={name}
				referrerPolicy={referrerPolicy}
				sandbox={sandbox}
				seamless={seamless}
				src={src}
				srcDoc={srcDoc}
				width={width}
			/>

			{cart && (
				<div className={styles.meta}>
					<>
						<a className={styles.cart} href={cart}>
							<Image
								alt="Pico-8 Cart Icon"
								src="/common/cart32.png"
								height={16}
								width={13}
							/>
							Cart
						</a>

						<span className={styles.cartName}>{cartName}</span>
					</>

					{code && (
						<>
							<span className={styles.separator}>|</span>
							<button
								className={styles.codeBtn}
								onClick={() => setPreOpened(!prePreOpened)}
								title="View Code"
							>
								Code ▽
							</button>
						</>
					)}
				</div>
			)}

			<Collapse in={prePreOpened}>
				<PreWithCodeCopy>
					<code>{code}</code>
				</PreWithCodeCopy>
			</Collapse>
		</div>
	);
};

export default P8SfxVideo;
