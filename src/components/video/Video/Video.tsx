import type { FC } from "react";

const Video: FC<{
	alt: string;
	height?: string | number;
	src: string;
	type?: string;
	width?: string | number;
}> = ({ alt, height, src, type, width }) => {
	/*
	 * React element
	 */
	return (
		<video controls height={height} width={width}>
			<source src={src} type={type} />
			<a href={src}>{alt}</a>
		</video>
	);
};

export default Video;
