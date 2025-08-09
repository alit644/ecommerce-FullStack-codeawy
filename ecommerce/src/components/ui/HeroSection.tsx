import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { memo  } from "react";
import { Link } from "react-router";
import MButton from "./Button";

const HeroSection = () => {
  return (
    <Box
      position="relative"
      bg="gray.900"
      minH={{ base: "350px", md: "500px" }}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent={{ base: "center", md: "space-between" }}
      flexDirection={{ base: "column", md: "row" }}
      textAlign={{ base: "center", md: "left" }}
      px={{ base: 4, md: 8 }}
      pt={{ base: 8, md: 12 }}
    >
      {/* محتوى النص والأزرار */}
      <Flex
        position="relative"
        left={0}
        zIndex={2}
        direction="column"
        maxW="2xl"
      >
        <Stack>
          <Text
            color={"gray.500"}
            as={"h2"}
            fontSize={"3xl"}
            fontWeight={"bold"}
          >
            Pro.Beyond.
          </Text>
          <Heading as="h1" size="6xl" color="white" fontWeight={"lighter"}>
            IPhone 14 <span style={{ fontWeight: "bold" }}>Pro</span>
          </Heading>
          <Text fontSize="xl" color="gray.400" mb={4} w={{ base: "full", md: "350px" }}>
            Created to change everything for the better. For everyone{" "}
          </Text>
          <Link to="/shop">
            <MButton
              title="Shop Now"
              variant="outline"
              colorScheme="teal"
              color="white"
              px={8}
              fontWeight="bold"
              boxShadow="md"
              _hover={{ color: "black" }}
              size="lg"
            />
          </Link>
        </Stack>
      </Flex>

      {/* bg */}
      <Box
        position={{ base: "static", md: "absolute" }}
        right={8}
        top={0}
        opacity={0.8}
        zIndex={1}
        bgGradient="linear(to-r, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))"
      >
        <Image
          loading="lazy"
          src="../../../public/Iphone Image.webp"
          w={{ base: "70%", md: "100%" }}
          h={{ base: "70%", md: "100%" }}
          mx={"auto"}
          
        />
      </Box>
    </Box>
  );
};

export default memo(HeroSection);
