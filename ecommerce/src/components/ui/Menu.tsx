import { Menu, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";
interface IMenuComponent {
  menuTrigger: ReactNode;
  children: ReactNode;
}
const MenuComponent = ({ menuTrigger, children }: IMenuComponent) => {
  return (
    <Menu.Root positioning={{ placement: "right-end" }}>
      <Menu.Trigger rounded="full" >
        {menuTrigger}
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
