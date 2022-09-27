import { Flex, Avatar, Text } from "@chakra-ui/react";

const UserBar = ({ avatar, username }) => {
	return (
		<Flex w="100%" h="16" bg="gray.100" px="4" justifyContent="start" alignItems="center">
			<Avatar referrerPolicy="no-referrer" src={avatar} />
			<Text ml="2" fontWeight="semibold">{username ?? "Please click any button to login"}</Text>
		</Flex>
	);
};

export default UserBar;
