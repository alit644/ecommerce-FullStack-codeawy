import {
  Box,
  CloseButton,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import MainTitle from "../components/MainTitle";
import FormGroup from "../components/ui/form/FormGroup";
import MInput from "../components/ui/MInput";
import CustomerInformationCard from "../components/ui/CustomerInformationCard";
import MButton from "../components/ui/Button";

//TODO: add react hook form 
//TODO: refactor checkout (INPUTS) 
//TODO: add loading state 
const Checkout = () => {
  return (
    <Container maxW="container.xl" mt={6} mb={6}>
      <MainTitle title="Checkout" isArrow={false} />
      {/* shopping Address */}
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
          <form>
            <Box spaceY={4}>
              <FormGroup
                label="Street Address"
                htmlFor="streetAddress"
                error={""}
              >
                <MInput
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  placeholder="Street Address"
                />
              </FormGroup>
              <HStack gap={2}>
                <FormGroup label="City" htmlFor="city" error={""}>
                  <MInput
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                  />
                </FormGroup>
                <FormGroup label="State" htmlFor="state" error={""}>
                  <MInput
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State"
                  />
                </FormGroup>
                <FormGroup label="Zip Code" htmlFor="zipCode" error={""}>
                  <MInput
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    placeholder="Zip Code"
                  />
                </FormGroup>
              </HStack>
              <HStack gap={2}>
                <FormGroup label="Phone" htmlFor="phone" error={""}>
                  <MInput
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                  />
                </FormGroup>
                <FormGroup label="Email" htmlFor="email" error={""}>
                  <MInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </FormGroup>
              </HStack>
            </Box>
          </form>
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
          <Box w="full">
            {/* Order Summary */}
            <Flex
              gap={4}
              alignItems="center"
              flexWrap={"wrap"}
            >
              <Box position="relative" w="70px" h="80px">
                <Image
                  src="https://images.unsplash.com/photo-1658226500474-9a01f528a93b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                  alt=""
                  w="70px"
                  h="80px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <CloseButton
                  zIndex={1}
                  variant="solid"
                  size="2xs"
                  colorScheme="red"
                  position="absolute"
                  top="-2"
                  right="-2"
                />
              </Box>
              <Box position="relative" w="70px" h="80px">
                <Image
                  src="https://images.unsplash.com/photo-1754462642749-200ce41c11df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  w="70px"
                  h="80px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <CloseButton
                  variant="solid"
                  size="2xs"
                  colorScheme="red"
                  position="absolute"
                  top="-2"
                  right="-2"
                />
              </Box>
            </Flex>
            {/* Payment Method */}
            <Box mt={6}>
              <CustomerInformationCard value={"2214"} lable="Sub Total:" />
              <CustomerInformationCard value="No Discount" lable="Discount:" />

              <HStack
                justifyContent="space-between"
                fontWeight="bold"
                fontSize="lg"
                borderTop="1px solid"
                borderColor="gray.200"
                pt={2}
              >
                <Text>Total:</Text>
                <Text fontWeight="bold" fontSize="lg" color={"teal.500"}>
                  2214 $
                </Text>
              </HStack>
              <MButton title="Place Order" size="md" variant="solid" w="full" mt={6}/>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Checkout;
