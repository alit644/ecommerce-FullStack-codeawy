import { Button, Icon } from "@chakra-ui/react";
import { memo } from "react";
interface MButtonProps extends React.ComponentProps<typeof Button> {
  colorScheme?: string;
  size: "sm" | "md" | "lg" | "xs" | "xl";
  title: string;
  variant: "ghost" | "outline" | "plain" | "solid" | "subtle" | "surface";
  type?: "button" | "submit" | "reset";
  w?: "full" | "fit-content" | "50%";
  isLoading?: boolean;
  icon?: React.ReactNode;
  
}
const MButton = ({
  title,
  colorScheme,
  size,
  variant = "solid",
  type = "button",
  w = "fit-content",
  isLoading = false,
  icon,
 ...props
}: MButtonProps) => {
  return (
    <Button
      loading={isLoading}
      w={w}
      colorScheme={colorScheme}
      size={size}
      variant={variant}
      type={type}
      {...props}
    >
      {icon && <Icon>{icon}</Icon>}
      {title}
    </Button>
  );
};

export default memo(MButton);
