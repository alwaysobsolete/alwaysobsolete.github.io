import type { FC, PropsWithChildren } from "react";

import type { FigureProps } from "@/components/figure/Figure/Figure";
import Figure from "@/components/figure/Figure/Figure";

const ImageFigure: FC<
	FigureProps<{
		alt: string;
		height?: string | number;
		href: string;
		src: string;
		width?: string | number;
	}>
> = ({ alt, caption, height, href, src, width }) => {
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
				<img alt={alt} height={height} src={src} width={width} />
			</LinkWrapper>
		</Figure>
	);
};

export default ImageFigure;
