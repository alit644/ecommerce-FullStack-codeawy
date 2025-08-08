import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import MProgress from "../ui/Progress";
import CustomerInformationCard from "../ui/CustomerInformationCard";
import MSelect from "../ui/Select";

const OrderProgress = () => {
  return (
    <Box
      mt={4}
      border="1px solid #e4e4e7"
      borderLeftColor="cyan.400"
      borderLeftWidth={3}
      p={4}
    >
      <Heading fontSize={"sm"} color={"gray.500"} fontWeight={"medium"}>
        Order Progress
      </Heading>
      <Box w={"full"} mt={6}>
        <MProgress value={21} />
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <CustomerInformationCard
          mt={3}
          mb={0}
          value="2022-01-01"
          lable="Updated At"
        />
        <CustomerInformationCard
          mt={3}
          mb={0}
          value="Delivered"
          lable="Status"
        />
      </Flex>

      <Box mt={6}>
        <MSelect options={[]} w={"full"} />
        <Button mt={2} colorScheme="teal" size="sm">
          Update Status
        </Button>
      </Box>
    </Box>
  );
};

export default OrderProgress;
