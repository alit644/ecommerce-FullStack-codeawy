import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router";
import MButton from "./MButton";

const HeroSummer = () => {
  return (
    <Box position="relative" overflow="hidden" h="350px" my={4}>
      {/* Background Image */}
      <Image
        loading="lazy"
        src="/Banner2Web.webp"
        alt="Summer Collection"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        objectFit="cover"
        bg="gray.100"
      />
      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bg="rgba(54, 50, 50, 0.5)"
      />

      {/* Content */}
      <VStack
        position="relative"
        height="100%"
        justifyContent="center"
        alignItems="center"
        color="white"
        textAlign="center"
        px={4}
      >
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Summer Collection 2025
        </Text>
        <Text fontSize="xl" opacity={0.5} mb={6}>
          Discover our latest summer collection with exclusive deals
        </Text>
        <Link to="/shop">
          <MButton
            title="Shop Now"
            variant="outline"
            colorScheme="teal"
            size="lg"
            px={8}
            py={4}
            color="white"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              color: "black",
            }}
            transition="all 0.3s ease"
          />
        </Link>
      </VStack>
    </Box>
  );
};

export default memo(HeroSummer);
