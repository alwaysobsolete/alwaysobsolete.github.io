import type { FC, PropsWithChildren } from "react";

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
	src,
	title,
	width,
}) => {
	/**
	 * Link Wrapper component
	 */
	const LinkWrapper: FC<PropsWithChildren> = ({ children }) =>
		href ? <a href={href}>{children}</a> : <>{children}</>;

	/*
	 * React element
	 */
	return (
		<Figure caption={caption}>
			<LinkWrapper>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img alt={alt} height={height} src={src} title={title} width={width} />
			</LinkWrapper>
		</Figure>
	);
};

export type { ImageFigureProps };
export default ImageFigure;
