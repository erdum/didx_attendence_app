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
	});

	useEffect(() => {
		autoSignIn((user) => {
			if (user) {
				setUser(user);
				setLoaders((prevState) => ({ ...prevState, user: false }));
				attendenceSheet.getAllRows((rows) => {
					const lastEntry = rows.filter((row) => row["UID"] == user.uid).at(-1);
					if (
						lastEntry &&
						Date.now() - lastEntry.check_in_timestamp < 82800000
					) {
						setLoaders({ checkin: false, checkout: false, user: false });
						setTimes({
							in: lastEntry.check_in_at,
							out:
								lastEntry?.check_out_at === ""
									? "----"
									: lastEntry.check_out_at,
						});
					} else {
						setLoaders({ checkin: false, checkout: false, user: false });
						setTimes({ in: "----", out: "----" });
					}
				});
			} else {
				setLoaders((prevState) => ({
					checkin: false,
					checkout: false,
					user: false,
				}));
				setTimes({ in: "----", out: "----", inTimestamp: null });
			}
		});
	}, []);

	const checkIn = (uid, username, email, lat, long) => {
		const date = new Date();
		const checkinTime = date.toLocaleTimeString("default", {
			hour: "numeric",
			minute: "numeric",
		});
		const checkinDate = date.toLocaleString("default", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		});
		setLoaders((prevState) => ({ ...prevState, checkin: true }));
		attendenceSheet.addRow(
			{
				UID: uid,
				Name: username,
				Email: email,
				check_in_date: checkinDate,
				check_in_at: checkinTime,
				check_in_cordinates: `${lat}, ${long}`,
				check_in_timestamp: Date.now(),
			},
			() => {
				setTimes((prevState) => ({ ...prevState, in: checkinTime }));
				setLoaders((prevState) => ({ ...prevState, checkin: false }));
			}
		);
	};

	const checkOut = (uid, lat, long) => {
		const date = new Date();
		const checkoutTime = date.toLocaleTimeString("default", {
			hour: "numeric",
			minute: "numeric",
		});
		const checkoutDate = date.toLocaleString("default", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		});
		setLoaders((prevState) => ({ ...prevState, checkout: true }));
		attendenceSheet.updateRow(
			{
				check_out_at: checkoutTime,
				check_out_date: checkoutDate,
				check_out_cordinates: `${lat}, ${long}`,
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

		const loc = GeoFence();
		loc.setGeoFenceCircle(24.877639668696567, 67.07011875156365, 10);
		loc.getLocation(
			(data) => {
				if (loc.isUserInFence()) {
					if (type === "check-in" && times?.in === "----") {
						checkIn(
							user.uid,
							user.displayName,
							user.email,
							data.lat,
							data.long
						);
					}

					if (type === "check-out" && times?.in != "----") {
						checkOut(user.uid, data.lat, data.long);
					}
				} else {
					alert("You are not at the DIDX location!");
				}
			},
			() => alert("Unable to get your location!")
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
				<Image src="/logo.png" objectFit="cover" />
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
					&#169; didx.net {new Date().getFullYear()}
				</Text>
			</Flex>
		</ChakraProvider>
	);
};

export default App;
