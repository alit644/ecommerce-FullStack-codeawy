import { Box, Image, Text, Button, IconButton, Badge } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import type { IProductCard } from "../../interfaces";
import { useAppDispatch } from "../../App/store";
import { addToCart } from "../../App/features/cartSlice";
import { Link } from "react-router";

const ProductCard = ({ data }: { data: IProductCard }) => {
  const { title, description, price, thumbnail, discount, documentId } = data;
  const dispatch = useAppDispatch();
  //! Handler
  const handelAddToCart = () => {
    dispatch(addToCart(data));
  };

  return (
    <Link to={`/product/${documentId}`}>
      <Box
        bg="gray.50"
        borderRadius="md"
        overflow="hidden"
        transition="transform 0.2s"
        w={{ base: "100%", sm: "200px", md: "220px" }}
        mx="auto"
        position="relative"
        textAlign="center"
        p={0}
      >
        <Box m={2} position="relative">
          <Image
            loading="lazy"
            rounded={"md"}
            src={`${import.meta.env.VITE_BASE_URL}${
              thumbnail.formats.small.url
            }`}
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
        <Box
          p={{ base: 2, sm: 4 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {discount !== 0 && (
            <Badge
              colorScheme="red"
              colorPalette={"red"}
              fontSize="xs"
              position="absolute"
              top={2}
              left={2}
            >
              {discount}% Discount
            </Badge>
          )}
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            color="gray.700"
            lineClamp={1}
          >
            {title}
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="gray.500"
            lineClamp={3}
            h={"4rem"}
          >
            {description}
          </Text>
          <Text fontWeight="bold" color="teal.600" fontSize="2xl">
            ${price}
          </Text>

          <Button
            onClick={handelAddToCart}
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
    </Link>
  );
};

export default ProductCard;
