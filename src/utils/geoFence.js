const GeoFence = () => {
	const data = {};

	const getLocation = (callback, errHandler) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				data.lat = position.coords.latitude;
				data.long = position.coords.longitude;
				callback &&
					callback({
						lat: position.coords.latitude,
						long: position.coords.longitude,
					});
			},
			(err) => {
				console.log(err);
				errHandler && errHandler(err);
			}
		);
	};

	const setGeoFenceCircle = (circles) => {
		data.circles = circles;
	};

	const checkFence = (lat, long, radius) => {
		const centerLat = lat / (180 / Math.PI);
		const centerLong = long / (180 / Math.PI);
		const currentLat = data.lat / (180 / Math.PI);
		const currentLong = data.long / (180 / Math.PI);

		// Haversine Formula
		const dlat = currentLat - centerLat;
		const dlong = currentLong - centerLong;
		let c = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(centerLat) * Math.cos(currentLat) * Math.pow(Math.sin(dlong / 2), 2);
		c = 2 * Math.asin(Math.sqrt(c));
		c = 6371 * c;
		return c <= radius;
	};

	const isUserInsideFence = () => {
		const areaName = data.circles.find(({ lat, long, radius }) => checkFence(lat, long, radius));
		return areaName?.name ?? false;
	};

	return {
		getLocation,
		setGeoFenceCircle,
		isUserInsideFence,
	};
};

export default GeoFence;
