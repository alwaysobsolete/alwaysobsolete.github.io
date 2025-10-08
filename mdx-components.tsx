import type { MDXComponents } from "mdx/types";

import ImageFigure from "@/components/figure/ImageFigure/ImageFigure";
import VideoFigure from "@/components/figure/VideoFigure/VideoFigure";
import Video from "@/components/video/Video/Video";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components: MDXComponents = {
	ImageFigure,
	Video,
	VideoFigure,
};

/**
 * Use MDX Components
 *
 * @see https://nextjs.org/docs/app/guides/mdx#global-styles-and-components
 */
function useMDXComponents(): MDXComponents {
	return components;
}

export { useMDXComponents };
