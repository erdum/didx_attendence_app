import { useState, useEffect } from "react";

import { Box, ScaleFade } from "@chakra-ui/react";
import UsersList from "./UsersList";
import AttendancePanel from "./AttendancePanel";

const Card = (props) => {
	const [showList, setShowList] = useState(false);

	useEffect(() => {
		window.addEventListener("hashchange", hashObserver);
		return () => window.removeEventListener("hashchange", hashObserver);
	}, []);

	useEffect(() => {
		if (showList) {
			window.location.hash = "list";
			return;
		}
		
		window.location.hash = "";
	}, [showList]);

	const hashObserver = ({ newURL }) => {
		const value = window.location.hash.replace("#", "");
		setShowList(value === "list");
	};

	return (
		<Box
			w="92%"
			h="70vh"
			maxH="420px"
			maxW="320px"
			boxShadow="base"
			position="fixed"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			borderRadius="md"
			bg="white"
			py="4"
		>
			<ScaleFade
				style={{
					height: "100%",
				}}
				initialScale={0.8}
				key={showList}
				in
			>
				<Box
					height="100%"
					display="flex"
					alignItems="stretch"
					flexDirection="column"
					overflowY="auto"
				>
					{showList ? (
						<UsersList />
					) : (
						<AttendancePanel {...props} showList={setShowList} />
					)}
				</Box>
			</ScaleFade>
		</Box>
	);
};

export default Card;
