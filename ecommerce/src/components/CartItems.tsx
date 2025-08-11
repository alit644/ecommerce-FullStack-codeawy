import {
  Box,
  Flex,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { IoAdd } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
import { useAppDispatch } from "../App/store";
import { addQuantity, removeQuantity } from "../App/features/cartSlice";
import { openDialog } from "../App/features/globalSlice";
import type { IProductCard } from "../interfaces";

interface ICartItems {
  item: IProductCard;
}

const CartItems = ({ item }: ICartItems) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const dispatch = useAppDispatch();

  //! handler
  const handelOpenDialog = (id: number) => {
    dispatch(openDialog(id));
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg={bgColor}
    >
      <Flex align="center" justify="space-between" flexWrap={"wrap"}  gap={2}>
        <HStack spaceX={4} >
          <Image
            src={`${import.meta.env.VITE_BASE_URL}${
              item?.thumbnail?.formats?.small?.url
            }`}
            alt={item.title}
            boxSize="80px"
            h={"90px"}
            objectFit="cover"
            borderRadius="md"
          />
          <VStack   spaceY={1}>
            <Heading size="md">{item.title}</Heading>
            <Text color={"teal.600"} fontSize="lg" fontWeight="bold">
              ${item.price.toFixed(2)}
            </Text>
          </VStack>
        </HStack>
        <HStack gap={2}  >
          <HStack borderWidth="1px" borderRadius="md">
            <Button
              aria-label="Decrease quantity"
              variant="ghost"
              size="xs"
              disabled={item.quantity === 1}
              onClick={() => dispatch(removeQuantity(item.id))}
            >
              <IoIosRemove size={20} />
            </Button>
            <Text fontWeight="bold">{item.quantity}</Text>
            <Button
              variant="ghost"
              aria-label="Increase quantity"
              size="xs"
              disabled={item.quantity >= 20}
              onClick={() => dispatch(addQuantity(item.id))}
            >
              <IoAdd size={20} />
            </Button>
          </HStack>

          <CloseButton
            aria-label="Remove item"
            variant="subtle"
            size="xs"
            onClick={() => handelOpenDialog(item.id)}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default CartItems;
