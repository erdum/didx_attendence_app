const Sheet = () => {
	
	const data = {};

	const init = ({ apiKey, sheetId, sheetName }) => {
		data.apiKey = apiKey;
		data.sheetId = sheetId;
		data.url = `https://api.sheetson.com/v2/sheets/${sheetName}`;
	};

	const getReq = async (url) => {};

	const postReq = async (data, url) => {
		const req = await fetch(url, {
			headers: {
				"Authorization": `Bearer ${data.apiKey}`,
				"X-Spreadsheet-Id": data.sheetId,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		});

		const res = await req.json();
		return res;
	};

	const updateRow = async (data) => {
		const test = await postReq(data, data.url);
		console.log(test);
	};

	return {
		init,
		updateRow,
	};
};

export default Sheet;
