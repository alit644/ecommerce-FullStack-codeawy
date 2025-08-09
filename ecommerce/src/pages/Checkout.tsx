import { Box, Container, Flex, Heading, HStack } from "@chakra-ui/react";
import MainTitle from "../components/MainTitle";
import FormGroup from "../components/ui/form/FormGroup";
import MInput from "../components/ui/MInput";
import MButton from "../components/ui/Button";
import TotalPrice from "../components/ui/TotalPrice";
import CheckoutCartCard from "../components/ui/CheckoutCartCard";
import { useAppDispatch, useAppSelector } from "../App/store";
import { Navigate, useNavigate } from "react-router";
import { useCalculateTotal } from "../Hooks/useCalculateTotal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCheckout } from "../schema";
import { checkoutData } from "../data";
import type { ICheckoutInput, IUserInfo } from "../interfaces";
import { useCreateOrderMutation } from "../App/services/createOrderApi";
import cookieManager from "../utils/cookieManager";
import { clearCart } from "../App/features/cartSlice";

interface IFormInput {
  streetAddress: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

const Checkout = () => {
  const nav = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartData);
  const dispatch = useAppDispatch();
  const user = cookieManager.get<IUserInfo>("user");
  const calculateTotal = useCalculateTotal(cartItems);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const calculateDiscount = () => {
    return calculateTotal * 0.1;
  };

  if (cartItems.length === 0) {
   return <Navigate to="/shop" replace />;
 }

  //! React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaCheckout),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const orderData = {
        user: user?.id,
        totalPrice: calculateTotal,
        statuss: "pending",
        items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        address: data,
      };
      await createOrder(orderData).unwrap();

      nav("/isOrderCompleted", { state: { status: "success" }, replace: true });
      dispatch(clearCart());
    } catch (error) {
      nav("/isOrderCompleted", { state: { status: "error" }, replace: true });
    }
  };

  //! Render
  const renderCartItems = cartItems.map((item) => (
    <CheckoutCartCard
      key={item.id}
      id={item.id}
      src={item.thumbnail.formats.small.url || ""}
      alt={item.title}
    />
  ));

  const renderCheckoutData = checkoutData.map((item: ICheckoutInput[], i) => (
    <HStack gap={2} key={i}>
      {item.map((item) => (
        <FormGroup
          key={item.id}
          label={item.label}
          htmlFor={item.id}
          error={errors[item.name]?.message}
        >
          <MInput
            {...register(item.name)}
            id={item.id}
            type={item.type}
            placeholder={item.placeholder}
          />
        </FormGroup>
      ))}
    </HStack>
  ));

 
  return (
    <Container maxW="container.xl" mt={6} mb={6}>
      <MainTitle title="Checkout" isArrow={false} />
      {/* shopping Address */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          gap={4}
          alignItems={"center"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
            w={{ base: "full", lg: "49%" }}
            minHeight={"354px"}
          >
            <Heading as="h2" size="lg" mb={4}>
              Shopping Address
            </Heading>

            <Box spaceY={4}>
              <FormGroup
                label="Street Address"
                htmlFor="streetAddress"
                error={errors.streetAddress?.message}
              >
                <MInput
                  {...register("streetAddress", {
                    required: "Street Address is required",
                  })}
                  id="streetAddress"
                  type="text"
                  placeholder="Street Address"
                />
              </FormGroup>
              {renderCheckoutData}
            </Box>
          </Box>
          {/* Your Order */}
          <Box
            w={{ base: "full", lg: "49%" }}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
            minHeight={"310px"}
          >
            <Heading as="h2" size="lg" mb={4}>
              Your Order
            </Heading>
            {/* Order Summary */}
            <Flex w="full" gap={4} alignItems="center" flexWrap={"wrap"}>
              {renderCartItems}
            </Flex>
            {/* Payment Method */}
            <Box>
              <TotalPrice
                totalPrice={calculateTotal}
                discount={calculateDiscount()}
              />
              <MButton
                loading={isLoading}
                loadingText="Placing Order..."
                type="submit"
                title="Place Order"
                size="md"
                variant="solid"
                w="full"
                mt={6}
              />
            </Box>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};

export default Checkout;
