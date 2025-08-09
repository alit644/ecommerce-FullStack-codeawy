import { Box, Text } from "@chakra-ui/react";
import { memo } from "react";
interface IFormGroup {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
    error: string | undefined;
}
const FormGroup = ({label, htmlFor, children, error}: IFormGroup) => {
  return (
    <Box w={"full"} spaceY={2}>
      <label
        htmlFor={htmlFor}
        style={{
          color: "#333",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "8px",
        }}
      > 
        {label}
      </label>
      {children}
      {error && <Text color="red.500" fontSize="sm">{error}</Text>}
    </Box>
  );
};

export default memo(FormGroup);
