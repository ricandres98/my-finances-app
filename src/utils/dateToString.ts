const monthArraySp = [
	{
		short: "ene",
		long: "enero",
  },
	{
		short: "feb",
		long: "febrero",
  },
	{
		short: "mar",
		long: "marzo",
  },
	{
		short: "abr",
		long: "abril",
  },
	{
		short: "may",
		long: "mayo",
  },
	{
		short: "jun",
		long: "junio",
  },
	{
		short: "jul",
		long: "julio",
  },
	{
		short: "ago",
		long: "agosto",
  },
	{
		short: "sep",
		long: "septiembre",
  },
	{
		short: "oct",
		long: "octubre",
  },
	{
		short: "nov",
		long: "noviembre",
  },
	{
		short: "dic",
		long: "diciembre",
  },
]

function dateToStringUTC(date: Date): string {
	const day = date.getUTCDate().toString().padStart(2, "0");
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	const year = date.getUTCFullYear();

	return `${day}/${month}/${year}`;
}

function dateToStringFormat(date: Date) {
	const day = date.getUTCDate().toString().padStart(2, "0");
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	const year = date.getUTCFullYear();

	return `${year}-${month}-${day}`;
}

function dateToStringDateMonth(date: Date) {
	const day = date.getUTCDate().toString().padStart(2, "0");
	const monthIndex = date.getUTCMonth();

	return `${day} ${monthArraySp[monthIndex].short}`;
}

export { dateToStringUTC, dateToStringFormat, dateToStringDateMonth }; 