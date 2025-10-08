import type { FC } from "react";

interface VideoProps {
	alt: string;
	height?: string | number;
	src: string;
	type?: string;
	width?: string | number;
}

const Video: FC<VideoProps> = ({ alt, height, src, type, width }) => {
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

export type { VideoProps };
export default Video;
