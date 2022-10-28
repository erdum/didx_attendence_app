import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

const DateBar = () => {
	const [date, setDate] = useState(new Date);

	useEffect(() => {
		const interval = setInterval(() => setDate(new Date), 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Flex
			w="100%"
			h="16"
			px="4"
			justifyContent="space-between"
			alignItems="center"
			mb="8"
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
