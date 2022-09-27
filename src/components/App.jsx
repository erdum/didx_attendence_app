import { ChakraProvider, extendTheme, Flex, Image, Heading, Text } from "@chakra-ui/react";
import Card from "./Card";

const App = () => {
	const theme = extendTheme({
		fonts: {
			heading: `Quicksand`,
			body: `Quicksand`,
		}
	});

	return (
		<ChakraProvider theme={theme}>
			<Flex
				w="100%"
				h="12"
				alignItems="stretch"
				justifyContent="space-between"
				bg="white"
				boxShadow="base"
				px="4"
			>
				<Image src="/logo.png" objectFit="cover" />
				<Heading as="h1" size="md" alignSelf="center" fontWeight="semibold" color="blackAlpha.800">
					Attendence Portal
				</Heading>
			</Flex>
			<Card />
			<Flex
				w="100%"
				h="16"
				alignItems="stretch"
				justifyContent="center"
				position="fixed"
				bottom="0"
				px="4"
			>
				<Text alignSelf="center" fontSize="sm">&#169; didx.net {new Date().getFullYear()}</Text>
			</Flex>
		</ChakraProvider>
	);
};

export default App;
 