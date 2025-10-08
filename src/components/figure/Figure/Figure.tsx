import type { FC, PropsWithChildren, ReactNode } from "react";

type FigureProps<T = object> = PropsWithChildren<
	{
		caption?: ReactNode;
	} & T
>;

const Figure: FC<FigureProps> = ({ caption, children }) => {
	/*
	 * React element
	 */
	return (
		<figure>
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
