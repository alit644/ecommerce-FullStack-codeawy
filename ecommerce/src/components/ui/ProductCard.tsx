import { Box, Image, Text, Button, IconButton } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import type { IProductCard } from "../../interfaces";

const ProductCard = ({
  title,
  description,
  thumbnail,
  price,
}: IProductCard) => {
  return (
    <Box
      bg="gray.50"
      borderRadius="md" // borderRadius خفيف
      overflow="hidden"
      transition="transform 0.2s"
      w={{ base: "100%", sm: "200px", md: "220px" }} // responsive width
      mx="auto"
      position="relative"
      textAlign="center"
      p={0}
    >
      <Box m={2} position="relative">
        <Image
          loading="lazy"
          rounded={"md"}
          src={thumbnail.url}
          alt={title}
          w="100%"
          h="150px"
          objectFit="cover"
          bg="gray.100"
        />
        <IconButton
          aria-label="إضافة إلى المفضلة"
          // color={isFavorite ? "red.400" : "gray.400"}
          variant="subtle"
          size="sm"
          position="absolute"
          top={2}
          right={2}
          _hover={{ color: "red.500", bg: "gray.50" }}
        >
          <FiHeart />
        </IconButton>
      </Box>
      <Box p={{ base: 2, sm: 4 }} spaceY={2}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          color="gray.700"
        >
          {title}
        </Text>
        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
          {description}
        </Text>
        <Text fontWeight="bold" color="teal.600" fontSize="2xl">
          ${price}
        </Text>
        <Button
          colorScheme="teal"
          size="sm"
          borderRadius={"md"}
          mt={2}
          w="full"
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
