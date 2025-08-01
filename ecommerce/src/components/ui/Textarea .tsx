import { Textarea, type TextareaProps } from "@chakra-ui/react";
interface MTextareaProps extends TextareaProps {
    placeholder: string;
}
const MTextarea = ({placeholder, ...props}: MTextareaProps) => {
  return <Textarea resize="none" h="100px"  placeholder={placeholder} {...props} />;
};

export default MTextarea;
