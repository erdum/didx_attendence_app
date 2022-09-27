const sheet = () => {
	const data = {};

	const getRequest = async () => {
		const req = await fetch(data.url, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${data.apiKey}`,
			},
		});

		const res = await req.json();
		return res;
	};

	const init = ({ apiKey, sheetId }) => {
		data.apiKey = apiKey;
		data.sheetId = sheetId;
		data.url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
	};

	const getFullSheet = async () => {
		const test = await getRequest();
		console.log(test);
	};

	return {
		init,
		getFullSheet,
	};
};

export default sheet;
