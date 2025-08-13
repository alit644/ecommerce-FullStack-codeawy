import { Box, Text, HStack, Image } from "@chakra-ui/react";
import type { IProductCard } from "../../interfaces";
interface IRecentProductsCard {
  product: IProductCard;
}
const RecentProductsCard = ({ product }: IRecentProductsCard) => {
  return (
    <HStack
      mb={3}
      w={"full"}
      alignItems="center"
      justifyContent="space-between"
      flexWrap={"wrap"}
      p={4}
      border="1px solid #e4e4e7"
      borderRadius="md"
    >
      {/* Image and Name */}
      <HStack>
        <Image
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL}${
            product.thumbnail?.formats?.small?.url
          }`}
          alt={product.title}
          width="60px"
          height="70px"
          objectFit="cover"
          borderRadius="md"
        />
        <Box>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight="medium"
            color="gray.700"
          >
            {product.title}
          </Text>
          <Text fontSize="md" color="gray.500">
            {product.category?.title}
          </Text>
        </Box>
      </HStack>
      {/* price and Created At */}
      <Box flex={1}>
        <Text
          textAlign={"right"}
          fontSize="md"
          fontWeight="bold"
          color="gray.700"
        >
          ${product.price}
        </Text>
        <Text textAlign={"right"} fontSize="md" color="gray.500">
          {product.createdAt?.split("T")[0]}
        </Text>
      </Box>
    </HStack>
  );
};

export default RecentProductsCard;
