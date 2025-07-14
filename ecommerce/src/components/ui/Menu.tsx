import { Avatar, Button, Menu, Portal } from "@chakra-ui/react";
import { useAppDispatch } from "../../App/store";
import { logout } from "../../App/features/authSlice";
import cookieManager from "../../utils/cookieManager";
import type { IUserInfo } from "../../interfaces";
const MenuComponent = () => {
 const userInfo = cookieManager.get<IUserInfo>("user");
  const dispatch = useAppDispatch();
  return (
    <Menu.Root positioning={{ placement: "right-end" }}>
      <Menu.Trigger rounded="full" focusRing="outside">
        <Avatar.Root size="sm" colorPalette="teal">
          <Avatar.Fallback name={userInfo?.username} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="account" fontSize="md">
              Account
            </Menu.Item>
            <Menu.Item value="settings" fontSize="md">
              Settings
            </Menu.Item>
            <Menu.Item value="orders" fontSize="md">
              Orders
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item value="logout" fontSize="md">
              <Button
                size="md"
                variant="outline"
                onClick={() => {
                  dispatch(logout());
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MenuComponent;
