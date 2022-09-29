import { Flex, Text } from "@chakra-ui/react";

const DateBar = () => {
	const date = new Date();

	return (
		<Flex
			w="100%"
			h="16"
			px="4"
			justifyContent="space-between"
			alignItems="center"
		>
			<Text ml="2" color="blackAlpha.800" fontSize="lg" fontWeight="semibold">
				{date.toLocaleString("default", { weekday: "short" })},{" "}
				{date.toLocaleString("default", { day: "numeric" })}{" "}
				{date.toLocaleString("default", { month: "short" })}
			</Text>
			<Text ml="2" color="blackAlpha.800" fontSize="lg" fontWeight="semibold">
				{date.toLocaleTimeString("default", {
					hour: "numeric",
					minute: "numeric",
				})}
			</Text>
		</Flex>
	);
};

export default DateBar;
