import {
  Box,
  Flex,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { MdDeleteOutline } from "react-icons/md";
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
      <Flex align="center" justify="space-between">
        <HStack spaceX={4}>
          <Image
            src={`${import.meta.env.VITE_BASE_URL}${
              item.thumbnail.formats.small.url
            }`}
            alt={item.title}
            boxSize="100px"
            h={"120px"}
            objectFit="cover"
          />
          <VStack align="start" spaceY={1}>
            <Heading size="md">{item.title}</Heading>
            <Text color={"teal.600"} fontSize="lg" fontWeight="bold">
              ${item.price.toFixed(2)}
            </Text>
            <HStack>
              <IconButton
                aria-label="Decrease quantity"
                as={IoIosRemove}
                variant="subtle"
                disabled={item.quantity === 1}
                onClick={() => dispatch(removeQuantity(item.id))}
              />
              <Text fontWeight="bold">{item.quantity}</Text>
              <IconButton
                variant="subtle"
                size="xs"
                aria-label="Increase quantity"
                as={IoAdd}
                disabled={item.quantity >= 20}
                onClick={() => dispatch(addQuantity(item.id))}
              />
            </HStack>
          </VStack>
        </HStack>

        <IconButton
          aria-label="Remove item"
          variant="ghost"
          size="xs"
          _hover={{ color: "red" }}
          as={MdDeleteOutline}
          colorScheme="teal"
          onClick={() => handelOpenDialog(item.id)}
        />
      </Flex>
    </Box>
  );
};

export default CartItems;
