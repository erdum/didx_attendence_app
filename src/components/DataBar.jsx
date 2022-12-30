import { Flex, Text, SkeletonText } from "@chakra-ui/react";

const DataBar = ({ checkinTime, checkoutTime, checkinLoader, checkoutLoader, location }) => {
	return (
		<>
			{checkinTime != "----" && checkinTime ? <Text ml="6" mb="1" fontWeight="semibold">Location {location}</Text> : null}
			<Flex
				w="100%"
				h="10"
				px="4"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text ml="2" color="blackAlpha.800" fontWeight="medium">
					Today checked in at:
				</Text>
				{!checkinLoader ? (
					<Text ml="2" color="blackAlpha.800" fontWeight="medium">
						{new Date(checkinTime).toLocaleTimeString('en-US', {
							hour: 'numeric',
							minute: 'numeric'
						})}
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
				{!checkoutLoader ? (
					<Text ml="2" color="blackAlpha.800" fontWeight="medium">
						{new Date(checkoutTime).toLocaleTimeString('en-US', {
							hour: 'numeric',
							minute: 'numeric'
						})}
					</Text>
				) : (
					<SkeletonText noOfLines={1} width="30%" />
				)}
			</Flex>
		</>
	);
};
export default DataBar;
