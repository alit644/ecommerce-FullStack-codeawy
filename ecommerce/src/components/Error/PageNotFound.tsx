import { Box, Icon, Text } from "@chakra-ui/react";
import { TbError404Off } from "react-icons/tb";
import MButton from "../ui/MButton";
const PageNotFound = () => {
  return (
    <Box
      w="full"
      h={"100vh"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      p={4}
      bg={`orange.20`}
      borderRadius="md"
      border={`2px solid orange`}
    >
      <Icon as={TbError404Off} boxSize={20} color={"orange"} />
      <Text color={"black"} fontWeight="bold" fontSize="lg">
        Oops! Page not found 404 , Please try again later.
      </Text>
      <MButton
        variant="solid"
        size="sm"
        title="Back to Home"
        onClick={() => (window.location.href = "/")}
      />
    </Box>
  );
};

export default PageNotFound;
