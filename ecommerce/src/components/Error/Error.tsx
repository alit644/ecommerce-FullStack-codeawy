import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface ErrorProps {
  code?: number;
  message?: string;
  description?: string;
}

const Error: React.FC<ErrorProps> = ({
  code = 404,
  message = "Not Found",
  description = "The page you are looking for doesn't exist.",
}) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      minH="200px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      py={8}
    >
      <VStack spaceY={4} alignItems="center" textAlign="center">
        <Text
          fontSize={{ base: "6rem", md: "8rem" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "white")}
        >
          {code}
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          color={useColorModeValue("gray.700", "gray.200")}
        >
          {message}
        </Text>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
          {description}
        </Text>
        <Button
          size="lg"
          colorScheme="blue"
          onClick={() => window.location.reload()}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          Reload Page
        </Button>
      </VStack>
    </Box>
  );
};

export default Error;
