import { useState, useEffect } from "react";

import { Box, Text, ScaleFade } from "@chakra-ui/react";

import UserBar from "./UserBar";

import Sheet from "../utils/sheet";
import epochToLocale from "../utils/time";

const ExtendedUserBar = ({ avatar, username, checkin, checkout, location }) => {
	return (
		<Box
			w="100%"
			mb="4"
			bg="gray.100"
			display="flex"
			flexDirection="column"
			alignItems="stretch"
		>
			<UserBar avatar={avatar} username={username} />
			<Text
				color="blackAlpha.800"
				fontWeight="medium"
				px="5"
				mt="2"
				fontSize="sm"
				display="flex"
				justifyContent="space-between"
			>
				Checked in at {checkin}
				<Text fontSize="xs" as="span">{location}</Text>
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

const Skeleton = () => {
	return (
		<Box display="flex" flexDirection="column">
			<UserBar loader />
			<UserBar loader />
			<UserBar loader />
			<UserBar loader />
			<UserBar loader />
			<UserBar loader />
		</Box>
	);
};

const UsersList = () => {
	const [users, setUsers] = useState(null);

	const attendenceSheet = Sheet();
	attendenceSheet.init({
		apiKey: import.meta.env.VITE_APIKEY,
	});

	useEffect(() => {
		const date = new Date();
		const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

		attendenceSheet.getTodayAttendance(today, (rows) =>
			setUsers(rows)
		);
	}, []);

	return (
		<ScaleFade
			initialScale={0.8}
			key={users}
			in
			style={{ height: "100%", width: "100%" }}
		>
			{users == null && <Skeleton />}
			{users?.length > 0 &&
				users.map((user) => (
					<ExtendedUserBar
						key={user.check_in_time}
						username={user.name}
						checkin={epochToLocale(user.check_in_time)}
						checkout={user.check_out_time ? epochToLocale(user.check_out_time) : "----"}
						// avatar={user.avatar}
						location={user.location}
					/>
				))}
			{users?.length === 0 && (
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
		</ScaleFade>
	);
};

export default UsersList;
