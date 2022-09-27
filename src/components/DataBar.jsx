import { Flex, Text } from "@chakra-ui/react";

const DataBar = ({ checkinTime, checkoutTime }) => {
	return (
		<>
			<Flex
				w="100%"
				h="10"
				px="4"
				mt="8"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text ml="2" color="blackAlpha.800" fontWeight="medium">
					Today checked in at:
				</Text>
				<Text ml="2" color="blackAlpha.800" fontWeight="medium">
					{checkinTime ?? "----"}
				</Text>
			</Flex>
			<Flex
				w="100%"
				h="10"
				px="4"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text ml="2" color="blackAlpha.800" fontWeight="medium">
					Today checked out at:
				</Text>
				<Text ml="2" color="blackAlpha.800" fontWeight="medium">
					{checkoutTime ?? "----"}
				</Text>
			</Flex>
		</>
	);
};
export default DataBar;
