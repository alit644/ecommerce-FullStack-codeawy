import { Box, Text, Icon } from "@chakra-ui/react";
import { FaServer } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { IoMdInformationCircleOutline } from "react-icons/io";
import type { IconType } from "react-icons/lib";
import MButton from "../ui/MButton";
interface IErrorType {
  color: string;
  icon: IconType;
  defaultMsg: string;
}
const errorTypes: Record<number, IErrorType> = {
  404: {
    color: "orange.400",
    icon: CiWarning,
    defaultMsg: "Oops! Page not found.",
  },
  500: {
    color: "red.500",
    icon: FaServer,
    defaultMsg: "Server error. Please try again later.",
  },
  401: {
    color: "blue.400",
    icon: IoMdInformationCircleOutline,
    defaultMsg: "Unauthorized. Please login.",
  },
};
const defaultError: IErrorType = {
  color: "gray.500",
  icon: IoMdInformationCircleOutline,
  defaultMsg: "An unexpected error occurred.",
};

const Error = ({ status, message , height = "300px" }: { status: number; message: string , height?: string }) => {
  const errorData = errorTypes[status] || defaultError;

  return (
    <Box
      w="full"
      h={height}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      p={4}
      bg={`${errorData.color}20`}
      borderRadius="md"
      border={`1px solid ${errorData.color}`}
    >
      <Icon as={errorData.icon} boxSize={11} color={errorData.color} />
      <Text color={"black"} fontWeight="bold" fontSize="lg">
        {message || errorData.defaultMsg}
      </Text>
      <MButton variant="solid" size="sm" title="Reload Page" onClick={() => window.location.reload()}/>
    </Box> 
  );
};

export default Error;
