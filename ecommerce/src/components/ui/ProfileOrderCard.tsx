import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { ICartProduct } from "../../interfaces";
import { useAppDispatch } from "../../App/store";
import { removeItemWishlist } from "../../App/features/wishlistSlice";
import { useCallback } from "react";
import { addToCart } from "../../App/features/cartSlice";
import { Link } from "react-router";
interface IProfileOrderCard {
  data: ICartProduct;
}

const ProfileOrderCard = ({ data }: IProfileOrderCard) => {
  const dispatch = useAppDispatch();
  const handelRemoveItemWishlist = useCallback(() => {
    dispatch(removeItemWishlist(data.id));
  }, [data.id, dispatch]);

  const handelAddToCart = useCallback(() => {
    dispatch(addToCart(data));
  }, [data, dispatch]);
  return (
    <Flex
      justifyContent={"space-between"}
      direction={"column"}
      alignItems={"start"}
      borderWidth={"1px"}
      gap={2}
      p={2}
      mb={2}
      borderRadius={"md"}
      position={"relative"}
    >
      <Image
        loading="lazy"
        src={`${data.thumbnail.formats.small.url}`}
        alt={data.title}
        w="100%"
        h="180px"
        objectFit="cover"
        borderRadius={"md"}
      />
      <Box>
        <Text
          lineClamp={1}
          fontSize={"md"}
          fontWeight={"medium"}
          color={"gray.800"}
        >
          Lenovo x240 Lenovo
        </Text>
        <Text
          lineClamp={2}
          fontSize={"sm"}
          color={"gray.500"}
          lineBreak={"anywhere"}
        >
          Lenovo x240 1TB 32 Ram Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Aspernatur, a!
        </Text>
      </Box>
      <Text fontSize={"lg"} fontWeight={"bold"} color={"teal.600"}>
        ${data.price}
      </Text>

      {/* actions */}
      <Stack
        pr={2}
        w="full"
        direction={{ base: "column", md: "row" }}
        alignItems={"center"}
      >
        <Button
          onClick={handelAddToCart}
          variant={"solid"}
          colorScheme={"blue"}
          size="xs"
          w={{ base: "full", md: "50%" }}
        >
          Add to Cart
        </Button>

        <Button
          variant={"outline"}
          colorScheme={"blue"}
          size="xs"
          w={{ base: "full", md: "50%" }}
        >
          <Link to={`/product/${data.documentId}`}>View Item</Link>
        </Button>
      </Stack>
      <CloseButton
        onClick={handelRemoveItemWishlist}
        position={"absolute"}
        top={-2}
        right={-2}
        variant="solid"
        size="2xs"
      />
    </Flex>
  );
};

export default ProfileOrderCard;
