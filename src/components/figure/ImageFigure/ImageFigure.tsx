import type { FC } from "react";

import type { FigureProps } from "@/components/figure/Figure/Figure";
import Figure from "@/components/figure/Figure/Figure";

type ImageFigureProps = FigureProps<{
	alt: string;
	height?: string | number;
	href: string;
	src: string;
	title?: string;
	width?: string | number;
}>;

const ImageFigure: FC<ImageFigureProps> = ({
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
	/*
	 * React element
	 */
	return (
		<Figure
			caption={caption || alt}
			marginBottom={marginBottom}
			marginTop={marginTop}
		>
			{href ? (
				<a href={href}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						alt={alt}
						height={height}
						src={src}
						title={title || alt}
						width={width}
					/>
				</a>
			) : (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					alt={alt}
					height={height}
					src={src}
					title={title || alt}
					width={width}
				/>
			)}
		</Figure>
	);
};

export type { ImageFigureProps };
export default ImageFigure;
