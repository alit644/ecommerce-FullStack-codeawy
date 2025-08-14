import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

import { useColorModeValue } from "../components/ui/color-mode";
import { useAppDispatch, useAppSelector } from "../App/store";
import { Link } from "react-router";
import { removeItem } from "../App/features/cartSlice";
import { closeDialog } from "../App/features/globalSlice";
import DialogAlert from "../components/ui/Dialog";
import CartItems from "../components/CartItems";
import MButton from "../components/ui/MButton";
import { useCalculateTotal } from "../Hooks/useCalculateTotal";
import NoResult from "../components/ui/NoResult";

const Cart = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const cartItems = useAppSelector((state) => state.cart.cartData);
  const id = useAppSelector((state) => state.global.id);
  const dispatch = useAppDispatch();

  const calculateTotal = useCalculateTotal(cartItems);

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
      <NoResult title="Your cart is empty" description="Please add some items to your cart." children={<Link  to="/shop">Go to Shop</Link>}/>
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
                  ${calculateTotal.toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Shipping</Text>
                <Text>Free</Text>
              </HStack>
              <HStack justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text color={"teal.600"} fontSize="lg" fontWeight="bold">
                  ${calculateTotal.toFixed(2)}
                </Text>
              </HStack>
              <Link to="/checkout">
                <MButton
                  title="Proceed to Checkout"
                  variant="solid"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                />
              </Link>
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
