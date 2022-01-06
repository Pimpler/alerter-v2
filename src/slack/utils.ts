export const fixDate = (number): string => {
	if (number < 10)
		return `0${number}`;
	else
		return number;
}
