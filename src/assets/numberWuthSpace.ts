export function numberWithSpaces(x: number | string): string {


	if (x || x === 0) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

	return ''
}