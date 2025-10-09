import type { MDXComponents } from "mdx/types";

import ImageFigure from "@/components/figure/ImageFigure/ImageFigure";
import P8CartFigure from "@/components/figure/P8CartFigure/P8CartFigure";
import P8SfxVideo from "@/components/video/P8SfxVideo/P8SfxVideo";
import PreWithCodeCopy from "@/components/pre/PreWithCodeCopy/PreWithCodeCopy";
import VideoFigure from "@/components/figure/VideoFigure/VideoFigure";
import Video from "@/components/video/Video/Video";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components: MDXComponents = {
	P8SfxVideo,
	pre: PreWithCodeCopy,
	ImageFigure,
	P8CartFigure,
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
