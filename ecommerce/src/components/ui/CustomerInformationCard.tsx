import { HStack, Text } from "@chakra-ui/react";

interface ICustomerInformationCard {
    value: string;
    lable: string;
    mt?: string |number
    mb?: string |number
}

const CustomerInformationCard = ({ value, lable, mt, mb = 3 }: ICustomerInformationCard) => {
  return (
      <HStack justifyContent={'space-between'} mb={mb} alignItems={"center"} gap={2} mt={mt}>
        <Text  fontWeight={"medium"}>
          {lable} :
        </Text>
        <Text >
          {value}
        </Text>
      </HStack>
  );
};

export default CustomerInformationCard;
