import { useState } from "react";

import { Box, ScaleFade } from "@chakra-ui/react";
import UsersList from "./UsersList";
import AttendancePanel from "./AttendancePanel";

const Card = (props) => {
	const [showList, setShowList] = useState(false);

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
					{showList ? <UsersList /> : <AttendancePanel {...props} showList={setShowList} />}
				</Box>
			</ScaleFade>
		</Box>
	);
};

export default Card;
