import type { FC } from "react";

import type { ImageFigureProps } from "@/components/figure/ImageFigure/ImageFigure";
import ImageFigure from "@/components/figure/ImageFigure/ImageFigure";

const P8CartFigure: FC<ImageFigureProps> = ({
	alt,
	caption,
	height,
	href,
	marginBottom,
	marginTop,
	src,
	title,
	width,
}) => {
	return (
		<ImageFigure
			alt={alt}
			caption={caption || alt}
			height={height}
			href={href || src}
			marginBottom={marginBottom}
			marginTop={marginTop}
			src={src}
			title={title || "This image is a p8.png cart, run it in Pico-8!"}
			width={width}
		/>
	);
};

export default P8CartFigure;
