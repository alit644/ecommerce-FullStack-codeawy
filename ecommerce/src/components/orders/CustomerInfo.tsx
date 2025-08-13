import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import MAvatar from "../ui/MAvatar";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import OrderAddress from "./OrderAddress";
import OrderProgress from "./OrderProgress";
import type { IUserInfo, TStatuss } from "../../interfaces";
import { Link } from "react-router";
interface ICustomerInfo {
  user: IUserInfo;
  statuss: TStatuss;
  updatedAt: string;
  address: {
   streetAddress?: string;
    city?: string;
    state?: string;
    email?: string;
    phone?: string;
  };
  context: string;
}
const CustomerInfo = ({ user, statuss, updatedAt, address, context }: ICustomerInfo) => {
  const handleSendEmail = () => {
    const subject = "Support Request";
    const body = "Hello, I need help with...";

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${address?.email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(gmailLink, "_blank");
  };

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
            <Link to={`https://wa.me/${address?.phone}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Button
                w={"fit-content"}
                borderRadius="md"
                variant="outline"
                size={{base: "xs", sm: "sm"}}
                p={1}
                gap={2}
              >
                <FaPhoneAlt size={12} color="#27272a" />
                <Text fontSize={{base: "xs", sm: "sm"}} color={"gray.800"} fontWeight={"medium"}>
                  {address?.phone}
                </Text>
              </Button>
            </Link>
            <Button
              variant="outline"
              w={"fit-content"}
              borderRadius="md"
              size={{base: "xs", sm: "sm"}}
              p={1}
              gap={2}
              onClick={handleSendEmail}
            >
              <MdEmail size={12} color="#27272a" />
              <Text fontSize={{base: "xs", sm: "sm"}} color={"gray.800"} fontWeight={"medium"}>
                {address?.email}
              </Text>
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Progress */}
      <OrderProgress statuss={statuss} updatedAt={updatedAt} context={context} />
      {/* location */}
      <OrderAddress address={address} />
    </Box>
  );
};

export default CustomerInfo;
