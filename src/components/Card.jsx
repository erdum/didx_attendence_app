import { Box, Flex, Button, ScaleFade } from "@chakra-ui/react";
import { CheckIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import UserBar from "./UserBar";
import DateBar from "./DateBar";
import DataBar from "./DataBar";

const Card = ({
	username,
	avatar,
	checkinTime,
	checkoutTime,
	flowHandler,
	userLoader,
	checkinLoader,
	checkoutLoader,
	location,
}) => {
	return (
		<Box
			w="92%"
			h="70vh"
			maxH="420px"
			maxW="320px"
			boxShadow="base"
			position="fixed"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			borderRadius="md"
			bg="white"
			py="4"
		>
			<ScaleFade
				style={{
					height: "100%",
				}}
				initialScale={0.8}
				in
			>
				<Box
					height="100%"
					display="flex"
					alignItems="stretch"
					flexDirection="column"
				>
					<UserBar avatar={avatar} username={username} loader={userLoader} />
					<DateBar />
					<DataBar
						checkinTime={checkinTime}
						checkoutTime={checkoutTime}
						checkinLoader={checkinLoader}
						checkoutLoader={checkoutLoader}
						location={location}
					/>
					<Flex
						mt="auto"
						alignItems="center"
						justifyContent="space-around"
						py="1"
					>
						<Button
							isLoading={checkinLoader}
							onClick={() => flowHandler({ type: "check-in" })}
							fontSize="sm"
							bg="green.500"
							color="white"
							px="5"
							_active={{
								background: "green.500",
							}}
							_hover={{
								background: "green.500",
							}}
						>
							Check In <CheckIcon ml="2" />
						</Button>
						<Button
							isLoading={checkoutLoader}
							onClick={() => flowHandler({ type: "check-out" })}
							fontSize="sm"
							bg="red.500"
							color="white"
							_active={{
								background: "red.500",
							}}
							_hover={{
								background: "red.500",
							}}
						>
							Check out <ArrowForwardIcon ml="2" />
						</Button>
					</Flex>
				</Box>
			</ScaleFade>
		</Box>
	);
};

export default Card;
