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

	const setGeoFenceCircle = (lat, long, radius) => {
		data.geoFenceCircleLat = lat;
		data.geoFenceCircleLong = long;
		data.geoFenceCircleRadius = radius;
	};

	const isUserInFence = () => {
		const centerLat = data.geoFenceCircleLat / (180 / Math.PI);
		const centerLong = data.geoFenceCircleLong / (180 / Math.PI);
		const currentLat = data.lat / (180 / Math.PI);
		const currentLong = data.long / (180 / Math.PI);

		// Haversine Formula
		const dlat = currentLat - centerLat;
		const dlong = currentLong - centerLong;
		let c = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(centerLat) * Math.cos(currentLat) * Math.pow(Math.sin(dlong / 2), 2);
		c = 2 * Math.asin(Math.sqrt(c));
		console.log(6731 * c);
		return true;
	};

	return {
		getLocation,
		setGeoFenceCircle,
		isUserInFence,
	};
};

export default GeoFence;
