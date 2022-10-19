import { useState, useEffect } from "react";

import { Box, Text, ScaleFade } from "@chakra-ui/react";

import UserBar from "./UserBar";

import Sheet from "../utils/sheet";

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

const getTodayAttendance = (user) => {
	const todayTime = new Date(user.check_in_date + " 00:00:00+0500").getTime();
	const currentTime = new Date().getTime();
	const diff = (((currentTime - todayTime) / 1000) / 60) / 60;
	return diff < 24 && diff > 0;
};

const UsersList = () => {
	const [users, setUsers] = useState(null);

	const attendenceSheet = Sheet();
	attendenceSheet.init({
		apiKey: import.meta.env.VITE_GOOGLE_SHEET_API_KEY,
		sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
		sheetName: "sheet1",
	});

	useEffect(() => {
		attendenceSheet.getAllRows((rawData) => {
			if (rawData.length === 0) {
				setUsers([]);
				return;
			}

			const data = rawData.filter(getTodayAttendance);
			setUsers(data);
		});
	}, []);

	return (
		<ScaleFade initialScale={0.8} key={users} in style={{ height: "100%", width: "100%" }}>
			{users == null && <Skeleton />}
			{users?.length > 0 &&
				users.map((user) => (
					<ExtendedUserBar
						username="Syed M Erdum Adnan"
						checkin="9:00 am"
						checkout="----"
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
