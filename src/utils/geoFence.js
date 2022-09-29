const GeoFence = () => {
	const data = {};

	const getLocation = (callback) => {
		navigator.geolocation.getCurrentPosition((position) => {
			data.lat = position.coords.latitude;
			data.long = position.coords.longitude;
			callback &&
				callback({
					lat: position.coords.latitude,
					long: position.coords.longitude,
				});
		});
	};

	const setFecnceSquare = (ltlat, ltlong, brlat, brlong) => {
		data.leftTopLat = ltlat;
		data.leftTopLong = ltlong;
		data.bottomRightLat = brlat;
		data.bottomRightLong = brlong;
	};

	const isUserInFence = () => {
		return (
			data.lat >= data.leftTopLat &&
			data.long >= data.leftTopLong &&
			data.lat <= data.bottomRightLat &&
			data.long <= bottomRightLong
		);
	};

	return {
		getLocation,
		setFecnceSquare,
		isUserInFence,
	};
};

export default GeoFence;
