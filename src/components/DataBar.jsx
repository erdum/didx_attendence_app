import { Flex, Text, SkeletonText } from "@chakra-ui/react";

const DataBar = ({ checkinTime, checkoutTime, checkinLoader, checkoutLoader }) => {
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
				{checkinLoader ? (
					<Text ml="2" color="blackAlpha.800" fontWeight="medium">
						{checkinTime}
					</Text>
				) : (
					<SkeletonText noOfLines={1} width="30%" />
				)}
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
				{checkoutLoader ? (
					<Text ml="2" color="blackAlpha.800" fontWeight="medium">
						{checkoutTime}
					</Text>
				) : (
					<SkeletonText noOfLines={1} width="30%" />
				)}
			</Flex>
		</>
	);
};
export default DataBar;
