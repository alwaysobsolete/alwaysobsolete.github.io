type ClassProps<C> = {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	[Key in keyof C as C[Key] extends Function ? never : Key]: C[Key];
};
