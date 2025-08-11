import { Center, VStack, Icon, Text } from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";
interface INoResult {
    title: string;
    description: string;
    children?: React.ReactNode;
}
const NoResult = ({title= "No Products Found", description= "Try adjusting your filters or search criteria", children}: INoResult) => {
  return (
    <Center h="200px">
      <VStack spaceY={4}>
        <Icon as={FaBoxOpen} boxSize={20} color="gray.300" />
        <Text fontSize="xl" fontWeight="bold" color="gray.600">
          {title}
        </Text>
        <Text color="gray.500">
          {description}
        </Text>
        {children}
      </VStack>
    </Center>
  );
};

export default NoResult;
