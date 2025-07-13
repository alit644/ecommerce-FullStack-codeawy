import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../App/store";
import { closeDialog } from "../../App/features/globalSlice";
interface DialogAlertProps {
  children: React.ReactNode;
  title: string;
  action: string;
  onConfirm: () => void;
}
const DialogAlert = ({ children, title, action, onConfirm }: DialogAlertProps) => {
  const { isOpenDialog } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  return (
    <Dialog.Root
      role="alertdialog"
      open={isOpenDialog}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={onConfirm}>{action}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogAlert;
