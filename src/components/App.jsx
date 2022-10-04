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
				attendenceSheet.getRow("UID", user.uid, (row) => {
					if (row) {
						setTimes({
							in: row.check_in_at,
							out: row.check_out_at,
						});
					}
				});
			}
		});
	}, []);

	const handleFlow = async ({ type }) => {
		if (!user) {
			signIn((user) => setUser(user));
			return;
		}

		const loc = GeoFence();
		loc.setGeoFenceCircle(24.877639668696567, 67.07011875156365, 10);
		loc.getLocation((data) => {
			if (loc.isUserInFence()) {
				if (type === "check-in" && !times?.in) {
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
					setTimes((prevState) => ({ in: checkinTime }));
					attendenceSheet.addRow({
						UID: user.uid,
						Name: user.displayName,
						Email: user.email,
						check_in_date: checkinDate,
						check_in_at: checkinTime,
					});
				}

				if (type === "check-out" && !times?.out && times?.in) {
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
					setTimes((prevState) => ({ ...prevState, out: checkoutTime }));
					attendenceSheet.updateRow(
						{
							check_out_at: checkoutTime,
							check_out_date: checkoutDate,
						},
						"UID",
						user.uid
					);
				}
			}
		});
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
				username={user?.displayName}
				avatar={user?.photoURL}
				checkinTime={times?.in}
				checkoutTime={times?.out}
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
