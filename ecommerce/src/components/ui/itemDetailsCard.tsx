import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import type { IProductCard } from "../../interfaces";
interface IItemDetailsCard {
  product: IProductCard;
}
const ItemDetailsCard = ({ product }: IItemDetailsCard) => {
  return (
    <Box>
      <HStack alignItems={"center"} gap={2}>
        <Image
          loading="lazy"
          src={`${import.meta.env.VITE_BASE_URL}${
            product?.thumbnail?.formats?.small?.url
          }`}
          alt={product?.title}
          width={"60px"}
          height={"60px"}
          objectFit="cover"
          borderRadius="md"
        />
        <VStack alignItems={"start"} gap={0}>
          <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
            {product?.title}
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            {product?.description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ItemDetailsCard;
