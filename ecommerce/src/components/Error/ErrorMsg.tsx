import { Text } from "@chakra-ui/react";
interface IErrorMsg {
    message: string;
}
const ErrorMsg = ({message}: IErrorMsg) => {
 return (
  message && <Text color="red.500" fontSize="sm">{message}</Text>
 );
}

export default ErrorMsg;
