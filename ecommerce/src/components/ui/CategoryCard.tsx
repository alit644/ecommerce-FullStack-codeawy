import { Box, Image, Text } from "@chakra-ui/react";
import type { ICategory } from "../../interfaces";
import { NavLink } from "react-router";

const CategoryCard = ({ title, thumbnail }: ICategory) => {
  return (
    <NavLink to={`/shop?category=${encodeURIComponent(title)}`}>
      <Box
        bg="gray.50"
        borderRadius="xl"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: "translateY(-3px)", boxShadow: "lg" }}
        cursor="pointer"
        w={{ base: "100%", sm: "200px", md: "220px" }} // responsive width
        mx="auto"
      >
        <Image
          loading="lazy"
          src={`${thumbnail?.formats?.small?.url}`}
          alt={title}
          w="100%"
          h="140px"
          objectFit="cover"
          bg="gray.100"
        />
        <Box p={4} textAlign="center">
          <Text fontSize="lg" color="block" fontWeight="semibold">
            {title}
          </Text>
        </Box>
      </Box>
    </NavLink>
  );
};
export default CategoryCard;
