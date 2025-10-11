import type { DetailedHTMLProps, FC, VideoHTMLAttributes } from "react";

interface VideoProps
	extends DetailedHTMLProps<VideoHTMLAttributes<HTMLElement>, HTMLElement> {
	alt: string;
	height?: string | number;
	src: string;
	type?: string;
	width?: string | number;
}

const Video: FC<VideoProps> = ({
	alt,
	autoPlay,
	controls = true,
	height,
	loop,
	playsInline = true,
	poster,
	preload = "meta",
	src,
	type,
	width,
}) => {
	/*
	 * React element
	 */
	return (
		<video
			autoPlay={autoPlay}
			controls={controls}
			height={height}
			loop={loop}
			playsInline={playsInline}
			poster={poster}
			preload={preload}
			width={width}
		>
			<source src={src} type={type} />
			<a href={src}>{alt}</a>
		</video>
	);
};

export type { VideoProps };
export default Video;
