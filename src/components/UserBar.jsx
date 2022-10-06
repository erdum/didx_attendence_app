import {
	Flex,
	Avatar,
	Text,
	SkeletonText,
	SkeletonCircle,
} from "@chakra-ui/react";

const UserBar = ({ avatar, username, loader }) => {
	return (
		<Flex
			w="100%"
			h="16"
			bg="gray.100"
			px="4"
			justifyContent="start"
			alignItems="center"
		>
			{loader ? (
				<SkeletonCircle size="10" />
			) : (
				<Avatar referrerPolicy="no-referrer" src={avatar} />
			)}
			{!loader && (
				<Text ml="2" fontWeight="semibold">
					{username}
				</Text>
			)}
			{loader && <SkeletonText noOfLines={2} width="60%" ml="4" />}
		</Flex>
	);
};

export default UserBar;
