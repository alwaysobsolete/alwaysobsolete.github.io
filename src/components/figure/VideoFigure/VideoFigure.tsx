import type { FC } from "react";

import type { FigureProps } from "@/components/figure/Figure/Figure";
import type { VideoProps } from "@/components/video/Video/Video";
import Figure from "@/components/figure/Figure/Figure";
import Video from "@/components/video/Video/Video";

const VideoFigure: FC<FigureProps & VideoProps> = ({
	alt,
	caption,
	height,
	src,
	type,
	width,
}) => {
	/*
	 * React element
	 */
	return (
		<Figure caption={caption}>
			<Video alt={alt} height={height} src={src} type={type} width={width} />
		</Figure>
	);
};

export default VideoFigure;
