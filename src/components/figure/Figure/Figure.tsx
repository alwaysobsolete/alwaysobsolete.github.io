import type { FC, PropsWithChildren, ReactNode } from "react";

type FigureProps<T = object> = PropsWithChildren<
	{
		caption?: ReactNode;
		marginBottom?: string | number | true;
		marginTop?: string | number | true;
	} & T
>;

const Figure: FC<FigureProps> = ({
	caption,
	children,
	marginBottom,
	marginTop,
}) => {
	/*
	 * React element
	 */
	return (
		<figure
			style={{
				marginBottom: marginBottom === true ? "6rem" : marginBottom,
				marginTop: marginTop === true ? "6rem" : marginTop,
			}}
		>
			{children}
			{caption && (
				<figcaption>
					<small>
						<em>{caption}</em>
					</small>
				</figcaption>
			)}
		</figure>
	);
};

export type { FigureProps };
export default Figure;
