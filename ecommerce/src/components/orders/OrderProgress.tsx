import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import MProgress from "../ui/Progress";
import CustomerInformationCard from "../ui/CustomerInformationCard";
import MSelect from "../ui/Select";
import { orderStatus } from "../../data";
import type { TStatuss } from "../../interfaces";
import {  useMemo, useState } from "react";
import { useUpdateOrderStatusMutation } from "../../App/services/createOrderApi";
import { useParams } from "react-router";
import { toaster } from "../ui/toaster";
interface IOrderProgress {
  statuss: TStatuss;
  updatedAt: string;
  context: string;
}
const OrderProgress = ({ statuss, updatedAt, context }: IOrderProgress) => {
  const { documentId } = useParams();
  const [status, setStatus] = useState<TStatuss | "">("");
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation({});

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
      setStatus("");
    } catch (error: any) {
      toaster.error({
        closable: true,
        title: error?.status === 403 ? "Forbidden" : "Status Update Failed",
        description:
          error?.status === 403
            ? "You don't have permission to perform this action."
            : "Status update failed",
        duration: 3000,
      });
    }
  };
  const handleCancelOrder = async () => {
    try {
      await updateOrderStatus({
        documentId: documentId as string,
        statuss: "cancelled",
      }).unwrap();
      toaster.success({
        title: "Success",
        description: "Order cancelled successfully",
        duration: 3000,
        closable: true,
      });
    } catch (error: any) {
      toaster.error({
        closable: true,
        title: error?.status === 403 ? "Forbidden" : "Order Cancel Failed",
        description:
          error?.status === 403
            ? "You don't have permission to perform this action."
            : "Order cancel failed",
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
        <MProgress value={statuss === "cancelled" ? 100 : statuss === "completed" ? 100 : progressValue} bg={statuss === "completed" ? "green" : statuss === "cancelled" ? "red" : "black"}/>
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"} gap={2} flexWrap={'wrap'}>
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
      {context === "dashboard" && (
        <Box mt={6}>
          <form onSubmit={handleUpdateStatus}>
            <MSelect
              options={orderOptions}
              w={"full"}
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
      )}
      {/* cancel order */}
      {context === "profile" &&
        (statuss === "pending" || statuss === "confirmed") && (
          <Box mt={6} >
            <Button
              mt={2}
              disabled={!(statuss === "pending" || statuss === "confirmed")}
              colorScheme="red"
              variant="subtle"
              colorPalette={"red"}
              size="sm"
              loading={isLoading}
              loadingText="Canceling..."
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          </Box>
        )}
    </Box>
  );
};

export default OrderProgress;
