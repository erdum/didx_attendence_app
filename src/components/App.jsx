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
	attendenceSheet.init({
		apiKey: import.meta.env.VITE_GOOGLE_SHEET_API_KEY,
		sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
		sheetName: "sheet1",
		sheetsonApiKey: import.meta.env.VITE_SHEETSON_API_KEY,
	});

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
			attendenceSheet.getAllRows((rows) => {
				const lastEntry = rows.filter((row) => row["UID"] == user.uid).at(-1);

				if (!lastEntry) {
					setLoaders({ checkin: false, checkout: false, user: false });
					setTimes({ in: "----", out: "----" });
					return;
				}

				const lastTimestamp = new Date(lastEntry.check_in_timestamp).getTime();
				if (Date.now() - lastTimestamp < 64800000) {
					setLoaders({ checkin: false, checkout: false, user: false });
					setTimes({
						in: lastEntry.check_in_at,
						out:
							lastEntry?.check_out_at === "" ? "----" : lastEntry.check_out_at,
					});
					setLocation(lastEntry.location);
				} else {
					setLoaders({ checkin: false, checkout: false, user: false });
					setTimes({ in: "----", out: "----" });
				}
			});
		});
	}, []);

	const checkIn = (uid, username, email, lat, long, location, avatar) => {
		const date = new Date();
		const checkinTimestamp = date.toISOString();
		const checkinTime = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
		});
		const checkinDate = date.toLocaleString("en-US", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});

		attendenceSheet.addRow(
			{
				UID: uid,
				Name: username,
				Email: email,
				check_in_date: checkinDate,
				check_in_at: checkinTime,
				check_in_timestamp: checkinTimestamp,
				check_in_cordinates: `${lat}, ${long}`,
				location,
				avatar,
			},
			() => {
				setTimes((prevState) => ({ ...prevState, in: checkinTime }));
				setLoaders((prevState) => ({ ...prevState, checkin: false }));
			}
		);
	};

	const checkOut = (uid, lat, long, location) => {
		const date = new Date();
		const checkoutDate = date.toLocaleString("en-US", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
		const checkoutTime = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
		});

		attendenceSheet.updateRow(
			{
				check_out_at: checkoutTime,
				check_out_date: checkoutDate,
				check_out_cordinates: `${lat}, ${long}`,
				location,
			},
			"UID",
			uid,
			() => {
				setTimes((prevState) => ({ ...prevState, out: checkoutTime }));
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
				const userLocation = loc.isUserInsideFence();
				if (userLocation) {
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
				} else {
					setLoaders({ checkin: false, checkout: false, user: false });
					alert("You are not at the office location!");
				}
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
