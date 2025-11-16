"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

interface IGPCContext {
	enabled: boolean;
}

const GPCContext = createContext<IGPCContext | undefined>(undefined);

/**
 * GPC Context Provider
 */
const GPCProvider: FC<PropsWithChildren<IGPCContext>> = ({
	children,
	enabled,
}) => {
	return (
		<GPCContext.Provider value={{ enabled }}>{children}</GPCContext.Provider>
	);
};

/**
 * useGPCContext
 *
 * React hook to get GPCContext or throw error
 * if parent component has no GPCContextProvider
 */
function useGPCContext() {
	const gpcContext = useContext(GPCContext);

	if (gpcContext === undefined) {
		throw new Error("useGPCContext must be called from within a GPCProvider");
	}

	return gpcContext;
}

export { GPCProvider, useGPCContext };
