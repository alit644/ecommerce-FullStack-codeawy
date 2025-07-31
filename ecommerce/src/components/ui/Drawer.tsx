import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useAppDispatch } from "../../App/store";
import { closeDrawer } from "../../App/features/globalSlice";
interface DrawerProps {
 isOpenDrawer: boolean;
  children: React.ReactNode;
  title: string;
  onConfirm?: () => void;
  action?: boolean;
}
const DrawerComponent = ({
  isOpenDrawer,
  children,
  title,
  onConfirm,
  action = true,
}: DrawerProps) => {
  const dispatch = useAppDispatch();
  return (
    <Drawer.Root
      open={isOpenDrawer}
      onOpenChange={() => dispatch(closeDrawer())}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            {action ? (
              <Drawer.Footer>
                <Button
                  variant="outline"
                  onClick={() => dispatch(closeDrawer())}
                >
                  Cancel
                </Button>
                <Button colorPalette="teal" onClick={onConfirm}>
                  Apply
                </Button>
              </Drawer.Footer>
            ) : (
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerComponent;
