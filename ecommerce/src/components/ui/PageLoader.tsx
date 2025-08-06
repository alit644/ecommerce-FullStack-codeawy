import { Flex, Spinner, Text } from "@chakra-ui/react";

const PageLoader = () => {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={4}
      color="colorPalette.600"
    >
      <Spinner color="colorPalette.600" size="xl" />
      <Text color="colorPalette.600">Loading...</Text>
    </Flex>
  );
};

export default PageLoader;
