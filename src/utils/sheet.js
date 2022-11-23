import GSheetReader from "g-sheets-api";

const Sheet = () => {
	const data = {};

	const init = ({ apiKey, sheetId, sheetName, sheetsonApiKey }) => {
		data.apiKey = apiKey;
		data.sheetId = sheetId;
		data.sheetsonApiKey = sheetsonApiKey;
		data.sheetName = sheetName;
		data.url = new URL(`https://api.sheetson.com/v2/sheets/${sheetName}`);
	};

	const getReq = async (url) => {
		try {
			const URL = url.searchParams.append("limit", 100);
			const req = await fetch(url, {
				headers: {
					Authorization: `Bearer ${data.sheetsonApiKey}`,
					"X-Spreadsheet-Id": data.sheetId,
				},
			});

			const res = await req.json();
			return res;
		} catch (err) {
			console.log(err);
		}
	};

	const postReq = async (body, url) => {
		try {
			const req = await fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${data.sheetsonApiKey}`,
					"X-Spreadsheet-Id": data.sheetId,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const res = await req.json();
			return res;
		} catch (err) {
			console.log(err);
		}
	};

	const patchReq = async (body, url, row) => {
		try {
			const req = await fetch(`${url}/${row}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${data.sheetsonApiKey}`,
					"X-Spreadsheet-Id": data.sheetId,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const res = await req.json();
			return res;
		} catch (err) {
			console.log(err);
		}
	};

	const addRow = async (body, callback) => {
		const result = await postReq(body, data.url);
		callback && callback(result);
	};

	const getRow = async (column, value, callback) => {
		const payload = {};
		payload[column] = value;

		filterByColumn(payload, (rows) => {
			const result = rows.at(-1);
			callback && callback(result ?? null);
		});
	};

	const updateRow = async (body, column, value, callback) => {
		getRow(column, value, async ({ rowIndex: id }) => {
			// +2 offset for id beacuase spreadsheet counts from 1 and 1 row is occupied by the headers
			const result = await patchReq(body, data.url, id + 2);
			callback && callback(result ?? null);
		});
	};

	const filterByColumn = (columns, callback) => {
		const options = {
			apiKey: data.apiKey,
			sheetId: data.sheetId,
			sheetName: data.sheetName,
			returnAllResults: false,
			filter: columns,
			filterOptions: {
				operator: "or",
				matching: "loose",
			},
		};
		GSheetReader(
			options,
			(results) => callback(results),
			(error) => {
				throw new Error(
					`Error while fetching data with GSheetReader: ${error}`
				);
			}
		);
	};

	return {
		init,
		addRow,
		updateRow,
		getRow,
		filterByColumn,
	};
};

export default Sheet;
