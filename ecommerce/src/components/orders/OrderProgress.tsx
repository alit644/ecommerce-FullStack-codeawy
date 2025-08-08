import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import MProgress from "../ui/Progress";
import CustomerInformationCard from "../ui/CustomerInformationCard";
import MSelect from "../ui/Select";
import { orderStatus } from "../../data";
import type { TStatuss } from "../../interfaces";
import { useCallback, useMemo, useState } from "react";
import { useUpdateOrderStatusMutation } from "../../App/services/createOrderApi";
import { useParams } from "react-router";
import { toaster } from "../ui/toaster";
interface IOrderProgress {
  statuss: TStatuss;
  updatedAt: string;
}
const OrderProgress = ({ statuss, updatedAt }: IOrderProgress) => {
  const { documentId } = useParams();
  const [status, setStatus] = useState<TStatuss | null>(null);
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) {
      toaster.error({ title: "Error", description: "Please select a status" });
      return;
    }
    try {
      await updateOrderStatus({
        documentId: documentId as string,
        statuss: status as TStatuss,
      }).unwrap();
      toaster.success({
        title: "Success",
        description: "Status updated successfully",
        duration: 3000,
        closable: true,
      });
      setStatus(null);
    } catch (error) {
      toaster.error({
        closable: true,
        title: "Error",
        description: "Status update failed",
        duration: 3000,
      });
    }
  };

  const progressValue = useMemo(() => {
    const currentStep = orderStatus.indexOf(statuss);
    return ((currentStep + 1) / orderStatus.length) * 100;
  }, [orderStatus, statuss]);

  const orderOptions = useMemo(() => {
    return orderStatus.map((tag: string) => ({
      value: String(tag),
      label: tag,
    }));
  }, [orderStatus]);
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
        <MProgress value={progressValue} />
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <CustomerInformationCard
          mt={3}
          mb={0}
          value={updatedAt?.split("T")[0] || ""}
          lable="Updated At"
        />
        <CustomerInformationCard
          mt={3}
          mb={0}
          value={statuss || "Delivered"}
          lable="Status"
        />
      </Flex>

      <Box mt={6}>
        <form onSubmit={handleUpdateStatus}>
          <MSelect
            options={orderOptions}
            w={"full"}
            value={status || ""}
            onChange={(e) => setStatus(e as TStatuss)}
          />
          <Button
            mt={2}
            disabled={!status || status === statuss}
            colorScheme="teal"
            size="sm"
            loading={isLoading}
            loadingText="Updating..."
            type="submit"
          >
            Update Status
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default OrderProgress;
