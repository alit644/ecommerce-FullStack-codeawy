import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { FaMapLocationDot } from "react-icons/fa6";

const OrderAddress = () => {
 return (
   <HStack alignItems={"center"} gap={3} mt={6}>
        <Circle size="10" bg="gray.200" color="gray.500">
          <FaMapLocationDot size={20} />
        </Circle>
        <VStack alignItems={"start"} gap={0}>
          <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
            User Address
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            123 Main St, Anytown, USA
          </Text>
        </VStack>
      </HStack>
 );
}

export default OrderAddress;
