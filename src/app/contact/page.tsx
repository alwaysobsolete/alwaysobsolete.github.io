"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ContactPage: FC = () => {
	/*
	 * Context
	 */
	const router = useRouter();

	/*
	 * Effects
	 */
	useEffect(() => {
		router.push(
			"https://docs.google.com/forms/d/e/1FAIpQLSebN55uEPtAfkQSF-qxJkSv8mer-n-GSxP6M0npRcoexBp5-w/viewform?usp=header",
		);
	});

	/*
	 * React element
	 */
	return <></>;
};

export default ContactPage;
