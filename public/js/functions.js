/**
 * 
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method 
 * @param {'/fabricantes' | '/fabricantes/:fabricanteId/modems} url 
 * @param {*} body 
 * @returns 
 */
async function callApi(method, url, headers = undefined, body = undefined) {
	const resp = await fetch(`/api/v1${url}`, {
		method: method,
		body: body,
		headers: headers
	});
	const data = await resp.json();
	return data;
}