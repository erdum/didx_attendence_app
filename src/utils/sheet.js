import GSheetReader from "g-sheets-api-erdum";

const Sheet = () => {
	const data = {};

	const init = ({ apiKey }) => {
		data.apiKey = apiKey;
		data.url = new URL("162.243.33.19/attendance");
	};

	const getReq = async (url) => {
		try {
			const req = await fetch(url, {
				headers: {
					apikey: data.apiKey,
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
					apikey: data.apiKey,
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

	const markAttendance = async (body, callback) => {
		const result = await postReq(body, data.url);
		callback && callback(result ?? null);
	};

	const markCheckout = async (uid, body, callback) => {
		const result = await postReq(body, `${data.url}/${uid}`);
		callback && callback(result ?? null);
	};

	const getTodayAttendance = async (date) => {
		const result = await getReq(`${data.url}/today/${date}`);
		callback && callback(result ?? null);
	};

	return {
		init,
		markAttendance,
		markCheckout,
		getTodayAttendance,
	};
};

export default Sheet;
