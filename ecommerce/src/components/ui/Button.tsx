import { Button } from "@chakra-ui/react";
interface MButtonProps extends React.ComponentProps<typeof Button> {
  colorScheme?: string;
  size: "sm" | "md" | "lg" | "xs";
  title: string;
  variant: "ghost" | "outline" | "plain" | "solid" | "subtle" | "surface";
  type?: "button" | "submit" | "reset";
  w?: string | number;
  isLoading?: boolean;
}
const MButton = ({
  title,
  colorScheme,
  size,
  variant = "solid",
  type = "button",
  w,
  isLoading = false,
}: MButtonProps) => {
  return (
    <Button
    
    loading={isLoading}
      w={w}
      colorScheme={colorScheme}
      size={size}
      variant={variant}
      type={type}
    >
      {title}
    </Button>
  );
};

export default MButton;
