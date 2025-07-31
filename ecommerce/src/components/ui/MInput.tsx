import { Input, type InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";
interface IMInput extends InputProps {
  type: string;
  variant?: "outline" | "subtle" | "flushed";
  size?: "xs" | "sm" | "md" | "lg";
}
const MInput = forwardRef<InputProps, IMInput>(({
  type = "text",
  variant = "outline",
  size = "md",
  ...props
}: IMInput) => {
  return <Input type={type} variant={variant} size={size} {...props} />;
});

export default MInput;
