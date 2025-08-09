import { Avatar } from "@chakra-ui/react";
import { memo } from "react";
const MAvatar = ({ name , colorPalette, border , size = "md" }: { name: string , colorPalette?: string , border?: string , size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "2xs" | "full" }) => {
  return (
    <Avatar.Root border={border} size={size} colorPalette={colorPalette}>
      <Avatar.Fallback name={name} />
    </Avatar.Root>
  );
};

export default memo(MAvatar);
