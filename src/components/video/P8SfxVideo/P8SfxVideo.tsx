"use client";

import type { FC } from "react";
import { Button, Collapse, Popover } from "@mantine/core";
import Help from "@material-symbols/svg-400/outlined/help.svg";
import Image from "next/image";
import { useState } from "react";

import type { VideoProps } from "@/components/video/Video/Video";
import PreWithCodeCopy from "@/components/pre/PreWithCodeCopy/PreWithCodeCopy";
import Video from "@/components/video/Video/Video";

import CartImg from "./cart32.png";
import styles from "./styles.module.scss";

const P8SfxVideo: FC<VideoProps & { cart?: string; sfx: string }> = ({
	alt,
	cart,
	height,
	sfx,
	src,
	type,
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
		<div className={styles.wrapper}>
			<Video alt={alt} height={height} src={src} type={type} width={width} />

			<div className={styles.meta}>
				{cart && (
					<>
						<a className={styles.cart} href={cart}>
							<Image
								alt="Pico-8 Cart Icon"
								src={CartImg}
								height={16}
								width={13}
							/>
							Cart
						</a>

						<span className={styles.cartName}>{cartName}</span>

						<span className={styles.separator}>|</span>
					</>
				)}

				<button
					className={styles.codeBtn}
					onClick={() => setPreOpened(!prePreOpened)}
					title="SFX snippet"
				>
					Code ▽
				</button>
			</div>

			<Collapse in={prePreOpened}>
				<div className={styles.sfxWrapper}>
					<Popover width={256} position="bottom" withArrow shadow="md">
						<Popover.Target>
							<Button
								className={styles.helpBtn}
								color="gray"
								title="Help"
								type="button"
							>
								<Help height="1rem" width="1rem" />
							</Button>
						</Popover.Target>
						<Popover.Dropdown className={styles.popOver}>
							This is an SFX snippet. To use it, copy the text to your
							clipboard, then paste into Pico-8.
						</Popover.Dropdown>
					</Popover>

					<PreWithCodeCopy>
						<code>{sfx}</code>
					</PreWithCodeCopy>
				</div>
			</Collapse>
		</div>
	);
};

export default P8SfxVideo;
