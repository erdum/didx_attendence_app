import { Box, Flex, Button } from "@chakra-ui/react";
import { CheckIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import UserBar from "./UserBar";
import DateBar from "./DateBar";
import DataBar from "./DataBar";

const Card = () => {
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
			<UserBar />
			<DateBar />
			<DataBar />
			<Flex mt="auto" alignItems="center" justifyContent="space-around" py="1">
				<Button fontSize="sm" bg="green.500" color="white" px="5">
					Check In <CheckIcon ml="2" />
				</Button>
				<Button fontSize="sm" bg="red.500" color="white">
					Check out <ArrowForwardIcon ml="2" />
				</Button>
			</Flex>
		</Box>
	);
};

export default Card;
