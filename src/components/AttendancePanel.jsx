import { Button, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";

import UserBar from "./UserBar";
import DateBar from "./DateBar";
import DataBar from "./DataBar";

const AttendancePanel = ({
	avatar,
	username,
	checkinTime,
	checkoutTime,
	checkinLoader,
	checkoutLoader,
	userLoader,
	location,
	flowHandler,
	showList
}) => {
	return (
		<>
			<UserBar avatar={avatar} username={username} loader={userLoader} />
			<DateBar />
			<DataBar
				checkinTime={checkinTime}
				checkoutTime={checkoutTime}
				checkinLoader={checkinLoader}
				checkoutLoader={checkoutLoader}
				location={location}
			/>
			<Button onClick={() => showList(true)} size="sm" w="30%" ml="6" mt="2">
				see others
			</Button>
			<Flex mt="auto" alignItems="center" justifyContent="space-around" py="1">
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
		</>
	);
};

export default AttendancePanel;
