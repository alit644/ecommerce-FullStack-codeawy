import { Box, Flex, HStack, Image, Text, Badge } from "@chakra-ui/react";
import MButton from "./Button";
import type { IOrder, IProductCard } from "../../interfaces";
interface IProfileOrderCard {
  order: any;
  status: string
  id: string
} 
const ProfileOrderCard = ({order, status, id}: IProfileOrderCard) => {



  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      // borderWidth={"1px"}
      borderBottomWidth={"1px"}
      p={2}
      mb={4}
      borderRadius={"md"}
    >
      <HStack gap={4}>
        <Image
          loading="lazy"
          src={
            `${import.meta.env.VITE_BASE_URL}${order.product?.thumbnail?.formats?.small?.url}`
          }
          alt={" "}
          w={"70px"}
          h={"80px"}
          objectFit="cover"
          borderRadius={"md"}
        />
        <Box>
          <Text fontSize={"md"} fontWeight={"medium"} color={"gray.800"}>
            {order.product.title}
          </Text>
          <Text fontSize={"sm"} color={"gray.500"} lineBreak={"anywhere"}>
            {order.product.description}
          </Text>
          <Text fontSize={"sm"} color={"gray.600"} fontWeight={"bold"}>
            ${order.product.price}
          </Text>
        </Box>
      </HStack>
      {/* order id */}
      <Text fontSize={"sm"} color={"gray.600"} fontWeight={"bold"}>
        Order ID : {id}
      </Text>
      {/* Status */}
      <Badge colorScheme="red" variant="surface" colorPalette={"blue"}>
       {status}
      </Badge>

      {/* actions */}
      {/* <HStack>
        <MButton
          variant={"outline"}
          colorScheme={"blue"}
          title="View Item"
          size="sm"
        />
       
      </HStack> */}
    </Flex>
  );
};

export default ProfileOrderCard;
