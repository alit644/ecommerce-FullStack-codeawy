import { Badge } from "@chakra-ui/react";

const MBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      colorPalette={
        status === "completed" || status === "delivered"
          ? "green"
          : status === "cancelled" || status === "pending"
          ? "red"
          : status === "confirmed"
          ? "blue"
          : "orange"
      }
    >
      {status}
    </Badge>
  );
};

export default MBadge;
