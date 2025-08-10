import { Alert, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { BsBox2Heart } from "react-icons/bs";
import MButton from "../ui/Button";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";

const IsOrderCompleted = () => {
  const { state } = useLocation();
  const nav = useNavigate();
  if (!state || !state.status) {
   return <Navigate to="/" replace />;
 }
 

  const status = state?.status as "success" | "error";
  const handleNavigate = () => {
    if (status === "success") {
      nav("/profile");
    } else {
      nav("/shop");
    }
  };
  
  return (
    <Box h={"calc(100vh - 80px)"} display="flex" flexDirection="column">
      <Alert.Root status={status} variant="surface">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            {status === "success" ? "Successful Order" : "Failed Order"}
          </Alert.Title>
          <Alert.Description>
            {status === "success"
              ? "Your order has been received"
              : "Oops! There was an issue"}
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      {/* Thank you for shopping */}
      <VStack alignItems="center" justifyContent="center" h="full">
        <BsBox2Heart size={100} />
        <Heading as="h2" size="lg" color="gray.800">
          {status === "success"
            ? "Thank you for shopping"
            : "Oops! There was an issue"}
        </Heading>
        <Text
          fontSize="md"
          color="gray.500"
          w={{ base: "80%", lg: "30%" }}
          textAlign="center"
        >
          {status === "success"
            ? "Your order has been successfully placed and is now being processed."
            : "Oops! There was a problem processing your order. Please review the details and try again."}
        </Text>
        <MButton
          title={status === "success" ? "Go To My Orders" : "Reorder"}
          size="md"
          variant="solid"
          onClick={handleNavigate}
        />
      </VStack>
    </Box>
  );
};

export default IsOrderCompleted;
