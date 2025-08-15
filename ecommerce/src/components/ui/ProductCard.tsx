import { Box, Image, Text, IconButton, Badge } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import type { ICartProduct, IProductCard } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../App/store";
import { addToCart } from "../../App/features/cartSlice";
import { Link } from "react-router";
import { memo, useCallback } from "react";
import MButton from "./MButton";
import { addToWishlist } from "../../App/features/wishlistSlice";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ data }: { data: IProductCard }) => {
  const {
    id,
    title,
    description,
    price,
    thumbnail,
    discount,
    documentId,
    brand,
  } = data;
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector((state) =>
    state.wishlist.wishlistData.find((item) => item.id === id)
  );
  //! Handler
  const handelAddToCart = useCallback(() => {
    const cartProduct: ICartProduct = {
      ...data,
      thumbnail: {
        formats: {
          small: {
            url: thumbnail?.formats?.small?.url || "",
          },
        },
      },
    };
    dispatch(addToCart(cartProduct));
  }, [data, thumbnail, dispatch]);

  const handelAddToWishlist = useCallback(() => {
    const wishlistProduct: ICartProduct = {
      ...data,

      thumbnail: {
        formats: {
          small: {
            url: thumbnail?.formats?.small?.url || "",
          },
        },
      },
    };

    dispatch(addToWishlist(wishlistProduct));
  }, [data, thumbnail, dispatch]);

  return (
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
      <Link to={`/${brand}/${documentId}`}>
        <Box m={2} position="relative">
          <Image
            loading="lazy"
            rounded={"md"}
            src={`${
              thumbnail?.formats?.small?.url
            }`}
            alt={title}
            w="100%"
            h="150px"
            objectFit="cover"
            bg="gray.100"
          />
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
            lineClamp={2}
            h="3rem"
            maxH="3rem"
          >
            {description}
          </Text>
          <Text fontWeight="bold" color="teal.600" fontSize="2xl">
            ${price}
          </Text>
          {/*  */}
        </Box>
      </Link>

      <Box mt={0} p={2}>
        <MButton
          title="Add To Cart"
          variant="solid"
          colorScheme="teal"
          size="sm"
          borderRadius={"md"}
          mt={2}
          w="full"
          onClick={handelAddToCart}
        />
      </Box>
      <IconButton
        onClick={handelAddToWishlist}
        aria-label="إضافة إلى المفضلة"
        variant="subtle"
        size="sm"
        position="absolute"
        top={3}
        right={3}
        _hover={{ color: "red.500", bg: "gray.50" }}
      >
        {isInWishlist ? <FaHeart color="red" /> : <FiHeart />}
      </IconButton>
    </Box>
  );
};

export default memo(ProductCard);
