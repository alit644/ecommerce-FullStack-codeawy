import { Menu, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Button } from "@chakra-ui/react";
interface IMenuComponent {
  menuTrigger: ReactNode;
  children: ReactNode;
}
const MenuComponent = ({ menuTrigger, children }: IMenuComponent) => {
  return (
    <Menu.Root positioning={{ placement: "right-end" }}>
      <Menu.Trigger rounded="full" focusRing="outside">
       <Button variant="outline">
        {menuTrigger}
       </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>{children}</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MenuComponent;
