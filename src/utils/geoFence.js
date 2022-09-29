const GeoFence = () => {
	const data = {};

	const getLocation = async (callback) => {
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

	const setFecnceSquare = (min, max) => {
		data.leftTopLat = min.lat;
		data.leftTopLong = min.long;
		data.rightBottomLat = max.lat;
		data.rightBottomLong = max.long;
	};

	const isUserInFence = () => {
		return (
			data.lat > data.leftTopLat &&
			data.lat < data.rightBottomLat &&
			data.long > data.leftTopLong &&
			data.long < data.rightBottomLong
		);
	};

	return {
		getLocation,
		setFecnceSquare,
		isUserInFence,
	};
};

export default GeoFence;
