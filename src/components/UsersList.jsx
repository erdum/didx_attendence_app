import { useState, useEffect } from "react";

import { Box, Text, ScaleFade } from "@chakra-ui/react";

import UserBar from "./UserBar";

import Sheet from "../utils/sheet";

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
				<Text fontSize="xs">{location}</Text>
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
		apiKey: import.meta.env.VITE_GOOGLE_SHEET_API_KEY,
		sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
		sheetName: "sheet1",
		sheetsonApiKey: import.meta.env.VITE_SHEETSON_API_KEY,
	});

	useEffect(() => {
		const todayDate = new Date().toLocaleDateString();
		attendenceSheet.filterByColumn({ check_in_date: todayDate }, (rows) =>
			setUsers(rows.length === 0 ? [] : rows)
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
						key={user.check_in_timestamp}
						username={user.Name}
						checkin={user.check_in_at}
						checkout={user.check_out_at || "----"}
						avatar={user.avatar}
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
