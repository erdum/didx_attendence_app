import { useState } from "react";

import { Box, Flex, Button } from "@chakra-ui/react";
import { CheckIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import UserBar from "./UserBar";
import DateBar from "./DateBar";
import DataBar from "./DataBar";

import { autoSignIn, signIn } from "../utils/auth";
import { doCheckIn, doCheckOut } from "../utils/flow";

const Card = () => {
	const [user, setUser] = useState(null);
	autoSignIn((loggedUser) => setUser(loggedUser));

	const handleCheckIn = () => {
		if (user) {
			doCheckIn(user);
		} else {
			signIn((loggedUser) => console.log(loggedUser));
		}
	};

	const handleCheckOut = () => {
		if (user) {
			doCheckOut(user);
		} else {
			signIn((loggedUser) => console.log(loggedUser));
		}
	};

	return (
		<Box
			w="92%"
			h="70vh"
			maxH="420px"
			boxShadow="base"
			position="fixed"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			borderRadius="md"
			bg="white"
			display="flex"
			alignItems="stretch"
			flexDirection="column"
			py="4"
		>
			<UserBar avatar={user?.photoURL} username={user?.displayName}/>
			<DateBar />
			<DataBar />
			<Flex mt="auto" alignItems="center" justifyContent="space-around" py="1">
				<Button
					onClick={handleCheckIn}
					fontSize="sm"
					bg="green.500"
					color="white"
					px="5"
				>
					Check In <CheckIcon ml="2" />
				</Button>
				<Button
					onClick={handleCheckOut}
					fontSize="sm"
					bg="red.500"
					color="white"
				>
					Check out <ArrowForwardIcon ml="2" />
				</Button>
			</Flex>
		</Box>
	);
};

export default Card;
