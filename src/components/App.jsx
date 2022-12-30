import { useState, useEffect } from "react";

import {
	ChakraProvider,
	extendTheme,
	Flex,
	Image,
	Heading,
	Text,
} from "@chakra-ui/react";
import Card from "./Card";

import { autoSignIn, signIn } from "../utils/auth";
import Sheet from "../utils/sheet";
import GeoFence from "../utils/geoFence";
import epochToLocale from "../utils/time";

const geoFenceCircles = [
	{
		name: "DIDX/Chainak",
		lat: 24.877639668696567,
		long: 67.07011875156365,
		radius: 0.6,
	},
	{
		name: "Incubator",
		lat: 24.863309057361086,
		long: 67.08572354841462,
		radius: 0.6,
	},
];

const App = () => {
	const [user, setUser] = useState(null);
	const [times, setTimes] = useState({
		in: null,
		out: null,
	});
	const [loaders, setLoaders] = useState({
		user: true,
		checkin: true,
		checkout: true,
	});
	const [location, setLocation] = useState(null);
	const theme = extendTheme({
		fonts: {
			heading: `Quicksand`,
			body: `Quicksand`,
		},
	});
	const attendenceSheet = Sheet();
	attendenceSheet.init();

	useEffect(() => {
		autoSignIn((user) => {
			if (!user) {
				setLoaders((prevState) => ({
					checkin: false,
					checkout: false,
					user: false,
				}));
				setTimes({ in: "----", out: "----" });
				return;
			}
			setUser(user);
			setLoaders((prevState) => ({ ...prevState, user: false }));

			const date = new Date();
			const todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

			attendenceSheet.getUserTodayAttendance(user.uid, todayDate, (row) => {
				if (!row) {
					setLoaders({
						checkin: false,
						checkout: false,
						user: false,
					});
					setTimes({ in: "----", out: "----" });
					return;
				}

				setTimes({
					in: epochToLocale(row.check_in_time),
					out: row.check_out_time == null ? "----" : epochToLocale(row.check_out_time),
				});
				setLocation(row.location);
				setLoaders({
					checkin: false,
					checkout: false,
					user: false,
				});
			});
		});
	}, []);

	const checkIn = (uid, username, email, lat, long, location, avatar) => {
		const date = new Date();
		const checkinDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		const checkinTime = Math.round(Date.now() / 1000);

		attendenceSheet.markAttendance(
			{
				uid,
				name: username,
				email,
				date: checkinDate,
				time: checkinTime,
				coordinates: `${lat}, ${long}`,
				location,
				avatar,
			},
			() => {
				setTimes((prevState) => ({ ...prevState, in: epochToLocale(checkinTime) }));
				setLoaders((prevState) => ({ ...prevState, checkin: false }));
			}
		);
	};

	const checkOut = (uid, lat, long, location) => {
		const date = new Date();
		const checkoutDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		const checkoutTime = Math.round(Date.now() / 1000);

		attendenceSheet.markCheckout(
			uid,
			{
				date: checkoutDate,
				time: checkoutTime,
				coordinates: `${lat}, ${long}`,
			},
			() => {
				setTimes((prevState) => ({ ...prevState, out: epochToLocale(checkoutTime) }));
				setLoaders((prevState) => ({ ...prevState, checkout: false }));
			}
		);
	};

	const handleFlow = async ({ type }) => {
		if (!user) {
			signIn((user) => setUser(user));
			return;
		}

		if (type === "check-in" && times?.in === "----")
			setLoaders((prevState) => ({ ...prevState, checkin: true }));
		if (type === "check-out" && times?.in != "----")
			setLoaders((prevState) => ({ ...prevState, checkout: true }));

		const loc = GeoFence();
		loc.setGeoFenceCircle(geoFenceCircles);
		loc.getLocation(
			({ lat, long }) => {
				const userLocation = loc.isUserInsideFence() ?? "";
				if (type === "check-in" && times?.in === "----") {
					checkIn(
						user.uid,
						user.displayName,
						user.email,
						lat,
						long,
						userLocation,
						user.photoURL
					);
					setLocation(userLocation);
				}

				if (type === "check-out" && times?.in != "----") {
					checkOut(user.uid, lat, long, userLocation);
				}
				setLoaders({
					checkin: false,
					checkout: false,
					user: false,
				});
			},
			() => {
				setLoaders({ checkin: false, checkout: false, user: false });
				alert("Unable to get your location!");
			}
		);
	};

	return (
		<ChakraProvider theme={theme}>
			<Flex
				w="100%"
				h="12"
				alignItems="stretch"
				justifyContent="space-between"
				bg="white"
				boxShadow="base"
				px="4"
			>
				<Image src="/logo.jpg" objectFit="cover" />
				<Heading
					as="h1"
					size="md"
					alignSelf="center"
					fontWeight="semibold"
					color="blackAlpha.800"
				>
					Attendence Portal
				</Heading>
			</Flex>
			<Card
				flowHandler={handleFlow}
				username={user?.displayName ?? "Click any button to login"}
				avatar={user?.photoURL}
				checkinTime={times?.in}
				checkoutTime={times?.out}
				userLoader={loaders.user}
				checkinLoader={loaders.checkin}
				checkoutLoader={loaders.checkout}
				location={location}
			/>
			<Flex
				w="100%"
				h="16"
				alignItems="stretch"
				justifyContent="center"
				position="fixed"
				bottom="0"
				px="4"
			>
				<Text alignSelf="center" fontSize="sm">
					&#169; supertec inc {new Date().getFullYear()}
				</Text>
			</Flex>
		</ChakraProvider>
	);
};

export default App;
