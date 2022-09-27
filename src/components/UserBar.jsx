import { Flex, Avatar, Text } from "@chakra-ui/react";

const UserBar = ({ avatar, username }) => {
	return (
		<Flex w="100%" h="16" bg="gray.100" px="4" justifyContent="start" alignItems="center">
			<Avatar src={avatar} />
			<Text ml="2" fontWeight="semibold">{username ?? "Username"}</Text>
		</Flex>
	);
};

export default UserBar;
