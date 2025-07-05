import { Button, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
      <Outlet />
    </div>
  );
};

export default RootLayout;
