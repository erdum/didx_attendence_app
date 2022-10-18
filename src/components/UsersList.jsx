import { Box, Text } from "@chakra-ui/react";

import UserBar from "./UserBar";

const ExtendedUserBar = ({ avatar, username, checkin, checkout }) => {
	return (
		<Box
			w="100%"
			mb="4"
			bg="gray.100"
			display="flex"
			flexDirection="column"
			alignItem="stretch"
		>
			<UserBar avatar={avatar} username={username} />
			<Text
				color="blackAlpha.800"
				fontWeight="medium"
				px="5"
				mt="2"
				fontSize="sm"
			>
				Checked in at {checkin}
			</Text>
			<Text
				color="blackAlpha.800"
				fontWeight="medium"
				px="5"
				my="2"
				fontSize="sm"
			>
				Checked out at {checkout}
			</Text>
		</Box>
	);
};

const UsersList = ({ users }) => {
	return (
		<>
			{users && users.length > 0 ? (
				users.map((user) => (
					<ExtendedUserBar
						username="Syed M Erdum Adnan"
						checkin="9:00 am"
						checkout="----"
					/>
				))
			) : (
				<Box
					w="100%"
					h="100%"
					display="flex"
					bgImage="url('/no_data.jpg')"
					bgPosition="center"
					bgSize="contain"
					bgRepeat="no-repeat"
				>
					<Text
						w="100%"
						textAlign="center"
						fontSize="xl"
						color="blackAlpha.800"
						fontWeight="semibold"
					>
						No Data
					</Text>
				</Box>
			)}
		</>
	);
};

export default UsersList;
