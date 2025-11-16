function getCookie(name: string) {
	return document.cookie
		.split(";")
		.find((v) => v.match(new RegExp(`${name}=`)))
		?.split("=")[1];
}

export default getCookie;
