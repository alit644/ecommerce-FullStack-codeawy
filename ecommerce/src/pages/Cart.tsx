import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

import { useColorModeValue } from "../components/ui/color-mode";
import { useAppDispatch, useAppSelector } from "../App/store";
import { LuShoppingBag } from "react-icons/lu";
import { NavLink } from "react-router";
import { removeItem } from "../App/features/cartSlice";
import { closeDialog } from "../App/features/globalSlice";
import DialogAlert from "../components/ui/Dialog";
import CartItems from "../components/CartItems";
import MButton from "../components/ui/Button";

const Cart = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const cartItems = useAppSelector((state) => state.cart.cartData);
  console.log(cartItems)
  const id = useAppSelector((state) => state.global.id);
  const dispatch = useAppDispatch();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  //! handler

  const handelConfirm = () => {
    if (id !== null) {
      dispatch(removeItem(id as number));
    }
    dispatch(closeDialog());
  };

  //! Render
  const renderCartItems = () => {
    return cartItems.map((item) => <CartItems key={item.id} item={item} />);
  };

  return (
    <Container maxW="container.xl" mt={6} mb={6}>
      <Heading as="h1" size="2xl" mb={6}>
        Shopping Cart
      </Heading>

      {cartItems.length === 0 ? (
        <Flex
          width="full"
          borderWidth={"1px"}
          borderRadius={"lg"}
          textAlign="center"
          direction="column"
          py={10}
          alignItems="center"
          justifyContent="center"
        >
          <LuShoppingBag size={200} color="#d4d4d8" />
          <Text as="h2" fontSize="2xl" color="gray.300">
            Your cart is empty
          </Text>
          <Text fontSize="md" color="gray.300">
            Please add some items to your cart.
          </Text>
          <NavLink to="/shop">
            <MButton
              title="Go to Shop"
              variant="solid"
              colorScheme="teal"
              size="md"
              mt={2}
            />
          </NavLink>
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {renderCartItems()}
          </SimpleGrid>

          <Box mt={6} borderWidth="1px" borderRadius="lg" p={4} bg={bgColor}>
            <Heading size="lg" mb={4}>
              Order Summary
            </Heading>
            <VStack align="stretch" spaceY={4}>
              <HStack justify="space-between">
                <Text>Subtotal</Text>
                <Text color={"teal.600"} fontSize="lg" fontWeight="bold">
                  ${calculateTotal().toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Shipping</Text>
                <Text>Free</Text>
              </HStack>
              <HStack justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text color={"teal.600"} fontSize="lg" fontWeight="bold">
                  ${calculateTotal().toFixed(2)}
                </Text>
              </HStack>
              <MButton
                title="Proceed to Checkout"
                variant="solid"
                colorScheme="blue"
                size="lg"
                w="full"
              />
            </VStack>
          </Box>
        </>
      )}
      <DialogAlert
        title="Are you sure?"
        action="Delete"
        children="Are you sure you want to remove this item from your cart?"
        onConfirm={handelConfirm}
      />
    </Container>
  );
};

export default Cart;
