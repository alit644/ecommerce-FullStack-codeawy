import { Box, Text, Button, VStack, Image } from "@chakra-ui/react";

const HeroSummer = () => {
  return (
    <Box position="relative" overflow="hidden" h="350px" my={4}>
      {/* Background Image */}
      <Image
        src="../../../public/Banner2.png"
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
        <Button
        variant={"outline"}

          size="lg"
          colorScheme="teal"
          color={"white"}
          px={8}
          py={4}
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" , color:"black"}}
          transition="all 0.3s ease"
        >
          Shop Now
        </Button>
      </VStack>
    </Box>
  );
};

export default HeroSummer;
