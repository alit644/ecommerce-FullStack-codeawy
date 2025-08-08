import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import MAvatar from "../ui/MAvatar";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import OrderAddress from "./OrderAddress";
import OrderProgress from "./OrderProgress";
import type { IUserInfo, TStatuss } from "../../interfaces";
interface ICustomerInfo {
  user: IUserInfo;
  statuss: TStatuss;
  updatedAt: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}
const CustomerInfo = ({ user, statuss, updatedAt, address }: ICustomerInfo) => {
  return (
    <Box
      mt={4}
      w={"full"}
      border={"1px solid #e4e4e7"}
      borderRadius="md"
      p={4}
      spaceY={4}
    >
      <Box>
        <Flex
          justifyContent={{ base: "center", sm: "space-between" }}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
        >
          {/* Customer information */}
          <HStack alignItems={"start"} gap={2}>
            <MAvatar
              name="John Doe"
              colorPalette="purple"
              border="2px solid #a855f7"
              size="lg"
            />
            <VStack alignItems={"start"} gap={0}>
              <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
                {user?.username}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                {user?.email}
              </Text>
            </VStack>
          </HStack>

          {/*  */}
          <HStack>
            <HStack
              w={"fit-content"}
              border="1px solid #e4e4e7"
              borderRadius="md"
              p={1}
              gap={2}
            >
              <FaPhoneAlt size={14} color="#27272a" />
              <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
                +536 566 73 88
              </Text>
            </HStack>
            <HStack
              w={"fit-content"}
              border="1px solid #e4e4e7"
              borderRadius="md"
              p={1}
              gap={2}
            >
              <MdEmail size={14} color="#27272a" />

              <Text fontSize={"sm"} color={"gray.800"} fontWeight={"medium"}>
                Send Email
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Progress */}
      <OrderProgress statuss={statuss} updatedAt={updatedAt} />
      {/* location */}
      <OrderAddress address={address} />
    </Box>
  );
};

export default CustomerInfo;
