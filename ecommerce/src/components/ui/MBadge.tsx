import { Badge } from "@chakra-ui/react";

const MBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      colorPalette={
        status === "pending"
          ? "red"
          : status === "confirmed"
          ? "blue"
          : status === "delivered"
          ? "green"
          : "orange"
      }
    >
      {status}
    </Badge>
  );
};

export default MBadge;
