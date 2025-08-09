import { Input, type InputProps } from "@chakra-ui/react";
import { forwardRef, memo, type ForwardedRef } from "react";

interface IMInput extends Omit<InputProps, "ref"> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  variant?: "outline" | "subtle" | "flushed";
  size?: "xs" | "sm" | "md" | "lg";
}

const MInput = forwardRef<HTMLInputElement, IMInput>(
  (
    { type = "text", variant = "outline", size = "md", ...props },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <Input
        w={"full"}
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        {...props}
      />
    );
  }
);


export default memo(MInput);
