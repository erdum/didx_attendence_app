const Sheet = () => {
	const data = {};

	const init = () => {
		data.url = "https://inapi.supertec.com/attendance";
	};

	const getReq = async (url) => {
		try {
			const req = await fetch(url);

			const res = await req.json();
			return res?.data ?? null;
		} catch (err) {
			console.log(err);
		}
	};

	const postReq = async (body, url) => {
		try {
			const req = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const res = await req.json();
			return res?.data ?? null;
		} catch (err) {
			console.log(err);
		}
	};

	const markAttendance = async (body, callback) => {
		const result = await postReq(body, data.url);
		callback && callback(result);
	};

	const markCheckout = async (uid, body, callback) => {
		const result = await postReq(body, `${data.url}/${uid}`);
		callback && callback(result);
	};

	const getTodayAttendance = async (date, callback) => {
		const result = await getReq(`${data.url}/today/${date}`);
		callback && callback(result);
	};

	const getUserTodayAttendance = async (uid, date, callback) => {
		const result = await getReq(`${data.url}/${date}/${uid}`);
		callback && callback(result?.length === 0 ? null : result);
	};

	return {
		init,
		markAttendance,
		markCheckout,
		getTodayAttendance,
		getUserTodayAttendance,
	};
};

export default Sheet;
