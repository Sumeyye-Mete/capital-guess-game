export const getCountries = async () => {
	const resp = await fetch("https://restcountries.com/v3.1/region/europe");
	const data = await resp.json();
	return data;
};
